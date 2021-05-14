import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "64074f66-e695-4c96-ab70-e7b23fdb99e7",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

})


export const UsersAPI = {
    getUser(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
        ).then(response => {
            return response.data
        })
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`,
        )
    },
    follow(userId) {
        return instance.post(`follow/${userId}`,
        )
    },
    getProfile(userId) {
        console.warn('obsolet method. Please profileApi object')
        return ProfileAPI.getProfile(userId);
    }


}


export const ProfileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId)
    },

    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },

    updateStatus(status) {
        return instance.put('profile/status', {status: status})
    },


}

export const AuthAPI = {
    me() {
        return instance.get('auth/me')
    },

    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },

    logout() {
        return instance.delete('auth/login')
    }

}