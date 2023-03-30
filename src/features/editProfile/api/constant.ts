import { UpdateMeRequest } from "@entities/auth";

export const initialValuesProfileEditForm: UpdateMeRequest = {
    firstName: "",
    lastName: "",
    patronymic: "",
    email: "",
    avatar: null,
    role: "",
};
