import { AdminArticleMaterialsExtraFilters, GetUploadedFilesRequest } from "@entities/storage";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetArticleMaterialFilesRequest = (
    params: TFunctionParams<unknown, AdminArticleMaterialsExtraFilters>
): GetUploadedFilesRequest => {
    const { articleId, ...rest } = params;

    return {
        ...rest,
        filter: {
            articleIds: articleId,
        },
    };
};
