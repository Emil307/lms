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
            userIds: {
                items: [studentId],
                operator: "not",
            },
        },
    };
};
