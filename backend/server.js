import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";

const secret = "bank";

const connection = mysql.createConnection({
  host: "localhost",
  user: "Ailin",
  password: "123",
  database: "bank",
  port: 8889,
});

function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;
let users = [];
const accounts = [];
//let userIds = 1;

app.post("/users", (req, res) => {
  const user = req.body;
  const amount = 100;
  const { userName, password, email } = user;
  console.log(user);

  connection.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [userName, password, email],
    (err, results) => {
      console.log("results", results);
      console.log("databas fel", err);

      if (err) {
        res.sendStatus(500);
      } else {
        const userId = results.insertId;

        connection.query(
          "INSERT INTO accounts (user_id, amount) VALUES (?, ?)",
          [userId, amount],
          (err, results) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.send("ok");
            }
          }
        );
      }
    }
  );
});

app.post("/sessions", (req, res) => {
  const user = req.body;
  const { userName, password } = user;

  console.log("användare vid inloggning: ", user);

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [userName],
    (err, results) => {
      console.log(results);

      if (err) {
        console.log("error från db:", err);
      } else {
        const dbUser = results[0];
        if (dbUser != null && dbUser.password === password) {
          const token = generateAccessToken(dbUser.id);

          console.log("SUCCESS!!");

          res.json({ token });
        } else {
          console.log("INCORRECT PW OR UNAME", user, dbUser, users);
          res.status = 401;
          res.json();
        }
      }
    }
  );
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  console.log("USERID: ", req.userId, "TOKEN: ");
  const user_id = req.userId;

  connection.query(
    "SELECT * FROM accounts WHERE user_id = ?",
    [user_id],
    (err, results) => {
      console.log(results);
      if (err) {
        console.log("error", err);
      } else {
        const dbAccount = results[0];
        console.log("db account:", dbAccount);
        res.json(dbAccount);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("server starts listening on port " + PORT);
});
