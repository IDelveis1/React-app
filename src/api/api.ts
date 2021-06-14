import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "64074f66-e695-4c96-ab70-e7b23fdb99e7",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

})


export const UsersAPI = {
    getUser(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
        ).then(response => {
            return response.data
        })
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`,
        )
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`,
        )
    },
    getProfile(userId: number) {
        console.warn('obsolet method. Please profileApi object')
        return ProfileAPI.getProfile(userId);
    }


}



type UpdateStatusData = {
    data: {
        status: string
    }
    resultCode: number
    messages: Array<string>
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId)
    },

    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },

    updateStatus(status: string) {
        return instance.put<UpdateStatusData>('profile/status', {status: status})
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put('profile/photo', formData, {headers: {
            'Content-Type': 'multipart/form-data',
        }})
    },

    saveProfileForm(profile: ProfileType) {
        return instance.put('profile', profile)
    }


}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}

export const AuthAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },

    logout() {
        return instance.delete('auth/login')
    }

}

export const SecurityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    },
}