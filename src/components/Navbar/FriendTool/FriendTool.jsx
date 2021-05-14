import React from 'react';
import clas from './../Navbar.module.css'

const FriendTool = (state) => {
    return (
        <div className={ clas.FriendItem }>
          <div>
          <img src='https://photogora.ru/img/product/big/3576/1473674103108563576.jpg'></img>
          </div>
          <div>
            { state.name }
          </div>
        </div>
    )
}

export default FriendTool;