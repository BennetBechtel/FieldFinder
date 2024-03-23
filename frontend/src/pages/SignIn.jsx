import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <div className="items-center h-full">
          <h1 className="text-4xl text-center mb-4">Anmelden</h1>
          <form className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="email@addresse.de"
              className="login"
            />
            <input type="password" placeholder="Passwort" className="login" />
            <button className="login">Anmelden</button>
            <div className="items-center text-center py-2 text-gray-500">
              Du hast noch kleinen Account?
              <Link
                to={"/sign-up"}
                className="ml-1 text-gray-700 underline"
              >
                Registrieren
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
