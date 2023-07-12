import { SignUpFormValidationSchema } from "@features/auth";

export const initialValues: SignUpFormValidationSchema = {
    lastName: "",
    firstName: "",
    email: "",
    passwords: {
        password: "",
        passwordConfirmation: "",
    },
    agreementWithConditionsAndTerms: false,
};
