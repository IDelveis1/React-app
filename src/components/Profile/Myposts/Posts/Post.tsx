import React from "react";
import cla from "./Post.module.css";

type Props = {
  like: number;
  message: string;
};

const Post: React.FC<Props> = (props) => {
  return (
    <div className={cla.imge}>
      <div>
        {props.message}
        <span className={cla.like}>{` ${props.like} Likes`}</span>
      </div>
    </div>
  );
};

export default Post;
