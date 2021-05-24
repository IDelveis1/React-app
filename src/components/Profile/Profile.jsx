import React from 'react';
import { Redirect } from 'react-router';
import MypostsContainer from './Myposts/MypostsContainer';
import clas from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';




const Profile = (props) => {

  return (
    <div>
        <ProfileInfo saveProfileForm={props.saveProfileForm} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={ props.profile } fullName={ props.fullName } status={props.status} updateStatus={ props.updateStatus }/>
          <MypostsContainer />
      </div>
    )
}

export default Profile;