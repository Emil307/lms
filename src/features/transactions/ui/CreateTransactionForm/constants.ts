import { CreateTransactionFormValidation } from "./types";

export const initialParams = {
    page: 1,
    perPage: 10,
};

export const initialValues: CreateTransactionFormValidation = {
    entityType: "",
    entityId: "",
    amount: "",
    userId: "",
    status: "",
    paymentType: "",
};
