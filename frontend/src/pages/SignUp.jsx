import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <div className="items-center h-full">
          <h1 className="text-4xl text-center mb-4">Registrieren</h1>
          <form className="max-w-md mx-auto">
            <input type="text" placeholder="Vorname" className="login" />
            <input type="text" placeholder="Nachname" className="login" />
            <input
              type="email"
              placeholder="email@addresse.de"
              className="login"
            />
            <input type="password" placeholder="Passwort" className="login" />
            <button className="login">Registrieren</button>
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
