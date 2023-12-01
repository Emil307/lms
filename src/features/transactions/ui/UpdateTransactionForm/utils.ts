import { GetAdminTransactionResponse, UpdateAdminTransactionRequest } from "@entities/transaction";
import { UpdateTransactionFormValidation } from "./types";

export const adaptUpdateTransactionFormValues = (data?: GetAdminTransactionResponse): Partial<UpdateTransactionFormValidation> => {
    return {
        status: data?.status.status,
        paymentType: data?.paymentType.type,
        amount: String(data?.amount),
        entityType: data?.entity.type.type,
        entityId: data?.entity.id.toString(),
        userId: data?.user.id.toString(),
    };
};

export const adaptUpdateTransactionRequest = (data: UpdateTransactionFormValidation): Omit<UpdateAdminTransactionRequest, "id"> => {
    return {
        ...data,
        entityId: Number(data.entityId),
        amount: Number(data.amount) || 0,
        userId: Number(data.userId),
    };
};
