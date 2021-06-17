type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactType
    photos: PhotosType
}

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActonsTypes<T extends {[key: string]: (...args : any[]) => any}> = ReturnType<PropertiesTypes<T>>