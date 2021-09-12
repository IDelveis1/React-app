import React from "react";
import { Redirect } from "react-router";
import { ProfileType } from "../../types/types";
import MypostsContainer from "./Myposts/MypostsContainer";
import clas from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  savePhoto: (file: File) => void;
  saveProfileForm: (profile: ProfileType) => void;
  updateStatus: (status: string) => void;
  profile: ProfileType | null;
  status: string;
  isOwner: boolean;
};

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        saveProfileForm={props.saveProfileForm}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MypostsContainer />
    </div>
  );
};

export default Profile;
