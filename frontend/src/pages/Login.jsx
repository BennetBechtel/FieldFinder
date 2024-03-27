import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="items-center h-full mt-44">
        <h1 className="text-4xl text-center mb-4">Anmelden</h1>
        <form className="max-w-md mx-auto">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@addresse.de"
            className="login"
          />
          <label htmlFor="password" className="sr-only">
            Passwort
          </label>
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            className="login"
          />
          <button className="login">Anmelden</button>
          <div className="items-center text-center py-2 text-gray-500">
            Du hast noch kleinen Account?
            <Link to={"/register"} className="ml-1 text-gray-700 underline">
              Registrieren
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
