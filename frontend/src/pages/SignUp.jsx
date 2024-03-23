import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signUpUser = () => {
    axios.post("/api/sign-up", {
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <div className="items-center h-full">
          <h1 className="text-4xl text-center mb-4">Registrieren</h1>
          <form
            className="max-w-md mx-auto"
            onSubmit={(e) => preventDefault(e)}
          >
            <input
              type="text"
              placeholder="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="login"
            />
            <input
              type="text"
              placeholder="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="login"
            />
            <input
              type="email"
              placeholder="email@addresse.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login"
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login"
            />
            <button type="button" onClick={signUpUser} className="login">
              Registrieren
            </button>
            <div className="items-center text-center py-2 text-gray-500">
              Du hast bereits einen Account?
              <Link to={"/sign-in"} className="ml-1 text-gray-700 underline">
                Anmelden
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
