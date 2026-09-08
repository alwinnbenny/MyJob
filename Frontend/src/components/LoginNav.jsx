import { NavLink } from "react-router-dom";

export const LoginNav = ({ children }) => {
  return (
    <section className="w-screen h-screen bg-white overflow-hidden">
      <div className="flex h-full mx-auto">
        <div className="flex-1 p-6 flex flex-col">
          <NavLink to="/">
            <img
              src="/logo.png"
              alt="MyJob Logo"
              className="w-32 object-contain"
            />
          </NavLink>

          <div className="flex-1 flex flex-col items-center justify-center">
            {children}
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/Image.svg"
            alt="checker-image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
