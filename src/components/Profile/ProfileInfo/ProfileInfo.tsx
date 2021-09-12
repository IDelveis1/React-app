import React, { useState } from "react";
import Preloader from "../../common/preloader/preloader";
import clas from "./ProfileInfo.module.css";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import logo from "../../../assets/images/man.png";
import ProfileDataForm from "./ProfileFormData";
import { ProfileType } from "../../../types/types";
import { ContactType } from "../../../types/types";

type PropsType = {
  profile: ProfileType | null;
  savePhoto: (file: File) => void;
  saveProfileForm: (formData: ProfileType) => void;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  status: string;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onSavePhotoChange = (e: any) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    props.saveProfileForm(formData);
    setEditMode(false);
  };

  return (
    <div className={clas.content}>
      <div className={clas.profileTips}>
        <img
          className={clas.cont}
          src="https://png.pngtree.com/thumb_back/fh260/background/20200801/pngtree-wide-view-of-sunset-background-with-a-boat-image_375681.jpg"
        ></img>
      </div>
      <div>
        <img
          src={props.profile.photos.large || logo}
          className={clas.mainPhoto}
        ></img>
        <div>
          {props.isOwner && <input type="file" onChange={onSavePhotoChange} />}
        </div>
        <ProfileStatusWithHook
          status={props.status}
          updateStatus={props.updateStatus}
        />
        <hr />
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => setEditMode(true)}
          />
        )}
      </div>
    </div>
  );
};

type Props = {
  isOwner: boolean;
  goToEditMode: () => void;
  profile: ProfileType;
};

const ProfileData: React.FC<Props> = (props) => {
  return (
    <div>
      {props.isOwner && (
        <div>
          <button onClick={props.goToEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>{props.profile.fullName}</b>
      </div>
      <div>
        <b>Looking for a job:</b> {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My professional skills:</b>{" "}
          {props.profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me:</b> {props.profile.aboutMe}
      </div>
      <div className={clas.contact}>
        <b>Contacts:</b>{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              ContactKey={key}
              ContactValue={props.profile.contacts[key as keyof ContactType]}
            />
          );
        })}
      </div>
    </div>
  );
};

type PropsContactsType = {
  ContactKey: string;
  ContactValue: string;
};

export const Contact: React.FC<PropsContactsType> = ({
  ContactKey,
  ContactValue,
}) => {
  return (
    <div>
      <b>{ContactKey}:</b> {ContactValue}
    </div>
  );
};

export default ProfileInfo;
