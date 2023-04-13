export const getInitialValuesForm = (defaultRole: string) => ({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    description: "",
    isActive: false,
    roleId: defaultRole,
    avatar: null,
    additionalImage: null,
});
