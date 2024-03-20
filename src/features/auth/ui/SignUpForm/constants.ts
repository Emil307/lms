import { SignUpFormValidationSchema } from "@features/auth";

export const initialValues: SignUpFormValidationSchema = {
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    passwords: {
        password: "",
        passwordConfirmation: "",
    },
    agreementWithConditionsAndTerms: false,
};
