import { UpdateMeRequest } from "@entities/auth";

export const initialValues: UpdateMeRequest = {
    firstName: "",
    lastName: "",
    patronymic: "",
    email: "",
    avatar: null,
    role: "",
};
