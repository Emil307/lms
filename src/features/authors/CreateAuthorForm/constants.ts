import { CreateAuthorRequest } from "@entities/author";

export const initialValues: CreateAuthorRequest = {
    firstName: "",
    lastName: "",
    patronymic: null,
    about: null,
    isActive: false,
    avatarId: null,
    avatar: null,
};
