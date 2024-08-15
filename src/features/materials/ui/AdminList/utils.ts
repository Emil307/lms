import dayjs from "dayjs";
import { z } from "zod";
import { GetUploadedFilesRequest, UploadedFilesFiltersForm } from "@entities/storage";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetMaterialFilesRequest = (params: TFunctionParams<UploadedFilesFiltersForm>): GetUploadedFilesRequest => {
    const { isActive, categoryIds, type, createdAtFrom, createdAtTo, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(z.coerce.number().safeParse(isActive).success && {
                isActive: isActive === "1",
            }),
            categoryIds,
            type: type,
            ...(createdAtFrom &&
                createdAtTo && {
                    createdAt: {
                        items: [dayjs(createdAtFrom).format("YYYY-MM-DD"), dayjs(createdAtTo).endOf("day").format()],
                        operator: "range",
                    },
                }),
        },
    };
};
