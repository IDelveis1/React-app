import React from 'react';
import cla from './Post.module.css'



const Post = (props) => {
  return (
    <div className={cla.imge}>
      <div>
         { props.message }
        <span className={cla.like}>{` ${props.like} Likes`}</span>
      </div>
      </div>
    )
}

export default Post;