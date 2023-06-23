import dayjs from "dayjs";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetTransactionsRequest, TransactionsFiltersForm } from "@entities/transaction";

export const adaptGetTransactionsRequest = (params: TFunctionParams<TransactionsFiltersForm>): GetTransactionsRequest => {
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

export const prepareStringOptionsForSelect = ({ data = [] }: { data?: string[] }): { value: string; label: string }[] => {
    return data?.map((item) => ({ value: item, label: item }));
};
