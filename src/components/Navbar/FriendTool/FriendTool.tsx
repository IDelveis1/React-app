import React from "react";
import clas from "./../Navbar.module.css";

type PropsType = {
  name: string;
};

const FriendTool: React.FC<PropsType> = (props) => {
  return (
    <div className={clas.FriendItem}>
      <div>
        <img src="https://photogora.ru/img/product/big/3576/1473674103108563576.jpg"></img>
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default FriendTool;
