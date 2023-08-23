import { TFunctionParams } from "@shared/ui/DataGrid/types";

import { GetAdminArticlePackagesRequest } from "@entities/articlePackage";
import { StudentArticlePackageListExtraParams } from "./types";

export const adaptGetAdminArticlePackagesRequest = (
    params: TFunctionParams<unknown, StudentArticlePackageListExtraParams>
): GetAdminArticlePackagesRequest => {
    const { studentId, ...rest } = params;

    return {
        ...rest,
        filter: {
            //TODO: добавить фильтрацию с оператором not как беки поправят и добавят данную функциональность
            // studentIds: {
            //     items: [studentId],
            //     operator: "not",
            // },
        },
    };
};
