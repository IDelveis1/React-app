import axios from "axios";
import { UsersType } from "../components/Redux/user-reducer";

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "64074f66-e695-4c96-ab70-e7b23fdb99e7",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

})

export type ResponseType<D = {}, > = {
    data: D
    resultCode: number
    messages: Array<string>
}


export type GetItemsType = {
    totalCount: number
    error: string
    items: Array<UsersType>
}




