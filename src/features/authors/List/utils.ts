import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminAuthorsFiltersForm, GetAdminAuthorsRequest } from "@entities/author";

export const adaptGetAdminAuthorsRequest = (params: TFunctionParams<AdminAuthorsFiltersForm>): GetAdminAuthorsRequest => {
    const { isActive, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive
        },
    };
};
