import React from 'react';
import Preloader from '../../common/preloader/preloader';
import clas from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
if (!props.profile) {
  return <Preloader />
}

    return (
      <div className={clas.content}>
      <div className={ clas.cont }>
        <img src='https://png.pngtree.com/thumb_back/fh260/background/20200801/pngtree-wide-view-of-sunset-background-with-a-boat-image_375681.jpg'></img>
      </div>
      <div className={ clas.profileTip }>
        <img src={ props.profile.photos.large } ></img>
        <ProfileStatus status={props.status} updateStatus={ props.updateStatus }/>
        <hr />
      </div>
      
      <div>
        Ava + content <br /><hr />
        { props.profile.fullName }
        <hr />
      </div>
    </div>
    )
}

export default ProfileInfo;