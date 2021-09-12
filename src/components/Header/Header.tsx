import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import clas from "./Header.module.css";
import img from "./logo.svg";

type PropsType = {
  logout: () => void;
  isAuth: boolean;
  login: string | null;
  children?: ReactNode;
};

const Header: React.FC<PropsType> = React.memo((props) => {
  return (
    <header className={`${clas.header}`}>
      <img alt="tsat" src={img}></img>
      <div className={clas.forlogin}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Logout</button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
});

export default Header;
