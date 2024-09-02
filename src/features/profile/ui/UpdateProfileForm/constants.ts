import { UpdateMeForm } from "@entities/auth";

export const initialValues: UpdateMeForm = {
    firstName: "",
    lastName: "",
    patronymic: "",
    email: "",
    phone: "",
    avatar: null,
    roleId: 0,
    roleName: "",
};
