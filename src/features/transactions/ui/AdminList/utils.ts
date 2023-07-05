import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminTransactionsFiltersForm, GetAdminTransactionsRequest } from "@entities/transaction";

export const adaptGetAdminTransactionsRequest = (params: TFunctionParams<AdminTransactionsFiltersForm>): GetAdminTransactionsRequest => {
    const { status, entityType, paymentType, createdAtFrom, createdAtTo, ...rest } = params;

    return {
        ...rest,
        filter: {
            status,
            "entity.type": entityType,
            paymentType,
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),
        },
    };
};
