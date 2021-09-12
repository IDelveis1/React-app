import { instance } from "./api"

type SecurityResponseType = {
    url: string
}

export const SecurityAPI = {
    getCaptcha() {
        return instance.get<SecurityResponseType>('security/get-captcha-url').then(res => res.data)
    },
}