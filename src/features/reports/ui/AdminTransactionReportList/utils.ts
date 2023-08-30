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
            roleId,
            ...(paymentTypes && {
                paymentTypes: [paymentTypes],
            }),
            ...(statuses && {
                statuses: [statuses],
            }),
            date: {
                from: dayjs(createdAtFrom).format("YYYY-MM-DD HH:mm:ss"),
                to: dayjs(createdAtTo).endOf("day").format("YYYY-MM-DD HH:mm:ss"),
            },
        },
    };
};
