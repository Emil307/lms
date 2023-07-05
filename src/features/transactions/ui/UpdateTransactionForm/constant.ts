import { UpdateTransactionFormValidation } from "./types";

export const initialParams = {
    page: 1,
    perPage: 10,
};

export const initialValues: UpdateTransactionFormValidation = {
    entityType: "",
    entityId: "",
    amount: null,
    userId: "",
    status: "",
    paymentType: "",
};
