import React from 'react';
import { NavLink } from 'react-router-dom';
import FriendTool from './FriendTool/FriendTool';
import clas from './Navbar.module.css'



const NavBar = (props) => {

  //let FriendElement = props.FriendData.map( m => <FriendTool name={m.name} /> )

    return (
        <nav className={`${clas.nav}`}>
        <div className={`${clas.item}`}>
          <div>
          <NavLink to='/profile' activeClassName={clas.active}>Profile</NavLink>
        </div>
        <div>
        <NavLink to='/dialogs' activeClassName={clas.active}>Messages</NavLink>

        </div>
        <div>
        <NavLink to='/news' activeClassName={clas.active}>News</NavLink>
        </div>
        <div>
        <NavLink to='/music' activeClassName={clas.active}>Music</NavLink>
        </div>
        <div>
        <NavLink to='/settings' activeClassName={clas.active}>Settings</NavLink>
        </div>
        </div> 
        <div className={ clas.parent }>
        {/*  { FriendElement } */}
        </div>
  
      </nav>
    )
}

export default NavBar;