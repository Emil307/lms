import { z } from "zod";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminStudentsFiltersForm, GetAdminStudentsRequest } from "@entities/user";

export const adaptGetAdminStudentsRequest = (params: TFunctionParams<AdminStudentsFiltersForm>): GetAdminStudentsRequest => {
    const { isActive, roleName, ...rest } = params;

    return {
        ...rest,
        filter: {
            roleName,
            ...(z.coerce.number().safeParse(isActive).success && {
                isActive: isActive === "1",
            }),
        },
    };
};
