import { CoursesFiltersForm, GetCoursesRequest } from "@entities/course";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetCoursesFromCollectionRequest = (
    params: TFunctionParams<Pick<CoursesFiltersForm, "collectionIds">>
): GetCoursesRequest => {
    const { collectionIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            collectionIds,
        },
    };
};
