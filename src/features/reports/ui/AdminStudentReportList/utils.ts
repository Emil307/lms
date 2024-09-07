import dayjs from "dayjs";
import { TFunctionParamsWithoutPagination } from "@shared/ui/DataGrid/types";
import { AdminStudentReportsFiltersForm, GetAdminStudentReportsRequest } from "@entities/report";

export const adaptGetAdminStudentReportsRequest = (
    params: TFunctionParamsWithoutPagination<AdminStudentReportsFiltersForm>
): GetAdminStudentReportsRequest => {
    const { transactionableType, createdAtFrom, createdAtTo, transactionableIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            transactionableType,
            transactionableIds,
            createdAt: {
                items: [dayjs(createdAtFrom).format("YYYY-MM-DD HH:mm:ss"), dayjs(createdAtTo).endOf("day").format("YYYY-MM-DD HH:mm:ss")],
                operator: "between",
            },
        },
    };
};
