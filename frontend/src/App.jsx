import { useState } from "react";
import Login from "./Login";

function App() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    const user = {
      userName,
      password,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:7005/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    }).then((res) => console.log(res, userString));
  }

  return (
    <div className="fixed top-0 left-20 h-2/3 mt-20 w-2/5 bg-gray-200 p-4 rounded-lg">
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-4xl mb-9">Register an account</h2>
      <div>
      <label htmlFor="userName" className="mr-2 text-xl">User Name:</label>
  <input
    id="userName"
    value={userName}
    type="text"
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
    <div className="flex items-center m-2 p-10">
      <label htmlFor="password" className="mr-2 text-xl">Password: </label>
      <input
        id="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="bg-green-800 text-white text-2xl mt-20 ml-10 p-3 rounded-lg">
        <button onClick={handleRegister}>Register</button>
      </div>
      <Login />
    </div>
    </div>
  );
}

export default App;