import { PhotosType, ProfileType } from "../types/types";
import { instance, ResponseType } from "./api";

type UpdateStatusDataType = {
    status: string
}

type SavePhotoResponseType = {
    photos: PhotosType
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId).then(res => res.data)
    },

    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(res => res.data)
    },

    updateStatus(status: string) {
        return instance.put<ResponseType<UpdateStatusDataType>>('profile/status', {status: status}).then(res => res.data)
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<ResponseType<SavePhotoResponseType>>('profile/photo', formData, {headers: {
            'Content-Type': 'multipart/form-data',
        }}).then(res => res.data)
    },

    saveProfileForm(profile: ProfileType) {
        return instance.put<ResponseType>('profile', profile).then(res => res.data)
    }


}