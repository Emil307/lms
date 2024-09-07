import dayjs from "dayjs";
import { TFunctionParamsWithoutPagination } from "@shared/ui/DataGrid/types";
import { AdminTransactionReportsFiltersForm, GetAdminTransactionReportsRequest } from "@entities/report";

export const adaptGetAdminStudentReportsRequest = (
    params: TFunctionParamsWithoutPagination<AdminTransactionReportsFiltersForm>
): GetAdminTransactionReportsRequest => {
    const { transactionableType, createdAtFrom, createdAtTo, roleId, transactionableIds, paymentTypes, statuses, ...rest } = params;

    return {
        ...rest,
        filter: {
            transactionableType,
            transactionableIds,
            ...(paymentTypes && {
                paymentTypes: [paymentTypes],
            }),
            ...(statuses && {
                statuses: [statuses],
            }),
            createdAt: {
                items: [dayjs(createdAtFrom).format("YYYY-MM-DD HH:mm:ss"), dayjs(createdAtTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")],
                operator: "between",
            },
        },
    };
};
