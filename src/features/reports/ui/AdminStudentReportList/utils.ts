import dayjs from "dayjs";
import { TFunctionParamsWithoutPagination } from "@shared/ui/DataGrid/types";
import { AdminStudentReportsFiltersForm, GetAdminStudentReportsRequest } from "@entities/report";

export const adaptGetAdminStudentReportsRequest = (
    params: TFunctionParamsWithoutPagination<AdminStudentReportsFiltersForm>
): GetAdminStudentReportsRequest => {
    const { transactionableType, createdAtFrom, createdAtTo, roleId, transactionableIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            transactionableType,
            transactionableIds,
            roleId,
            date: {
                from: dayjs(createdAtFrom).format("YYYY-MM-DD HH:mm:ss"),
                to: dayjs(createdAtTo).endOf("day").format("YYYY-MM-DD HH:mm:ss"),
            },
        },
    };
};
