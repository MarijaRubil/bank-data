import { useState } from "react";

let myToken;

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState("");

  function handleLogin() {
    const user = {
      userName,
      password,
    };

    console.log(user);

    const userString = JSON.stringify(user);

    console.log(userString);

    fetch("http://localhost:7005/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:7005/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => {
        console.log("ACCOUNTS GOT", res);
        return res.json();
      })
      .then((data) => {
        setMoney(data.money);
      });
  }

  return (
    <div className="fixed top-0 right-20 h-2/3 mt-20 w-2/5 bg-gray-200 p-4 rounded-lg ">
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-4xl mb-9">Log in</h2>
      <div className="flex items-center">
  <label htmlFor="userName" className="mr-2 text-xl ">User Name:</label>
  <input
    id="userName"
    value={userName}
    type="text"
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
       <div className="flex items-center  m-2 p-10">
  <label htmlFor="password" className="mr-2 text-xl ">Password: </label>
  <input
    id="password"
    value={password}
    type="password"
    onChange={(e) => setPassword(e.target.value)}
  />
</div>
<div className="bg-green-800 text-white text-xl p-3 m-3 rounded-lg">
        <button onClick={handleLogin}>Login</button>
        </div>
        <div className="bg-green-900 text-white text-xl mt-5 p-3 rounded-lg">
        <button onClick={handleGetAccount}> Check balance</button>
        <h2 className="pt-4">Balance: {money}</h2>
      </div>
    </div>
    </div>
  );
}

export default Login;
