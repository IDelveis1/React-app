import React from "react";
import { NavLink } from "react-router-dom";

const DialogItem: React.FC<{ id: Number; name: string }> = (props) => {
  return (
    <div>
      <NavLink to={"/Dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
