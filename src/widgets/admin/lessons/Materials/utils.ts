import { GetUploadedFilesRequest } from "@entities/storage";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminLessonMaterialsExtraParams } from "./types";

export const adaptGetMaterialFilesRequest = (
    params: TFunctionParams<unknown, AdminLessonMaterialsExtraParams>
): GetUploadedFilesRequest => {
    const { lessonIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            lessonIds,
        },
    };
};
