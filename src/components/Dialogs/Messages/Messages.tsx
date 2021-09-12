import React from "react";
import s from "./../Dialogs.module.css";

type Props = {
  message: string;
};

const Message: React.FC<Props> = (props) => {
  return (
    <div>
      <div>{props.message}</div>
    </div>
  );
};

export default Message;
