import Axios from "axios";
import { useState } from "react";

export default function AuthorizeAdmin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function authHandler(e) {
    e.preventDefault();

    const { status } = await Axios.post("admin/api/v1/login", {
      login,
      password,
    });

    if (status === 200) {
      window.location.reload()
    }
  }

  return (
    <div className="text-center login">
      <form className="form-signin" onSubmit={authHandler}>
        <h1 className="h3 mb-3 font-weight-normal">Sign in (Admin Panel)</h1>
        <label htmlFor="Login" className="sr-only">
          Login
        </label>
        <input
          type="text"
          id="Login"
          className="form-control"
          placeholder="Login"
          name="login"
          required=""
          autoFocus=""
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        <label htmlFor="Password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="Password"
          name="password"
          className="form-control"
          placeholder="Password"
          required=""
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
