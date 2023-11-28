import { CreateAdminTransactionRequest } from "@entities/transaction";
import { CreateTransactionFormValidation } from "./types";

export const adaptCreateTransactionRequest = (data: CreateTransactionFormValidation): CreateAdminTransactionRequest => {
    return {
        ...data,
        entityId: Number(data.entityId),
        amount: data.amount ? Number(data.amount) : 0,
        userId: Number(data.userId),
    };
};
