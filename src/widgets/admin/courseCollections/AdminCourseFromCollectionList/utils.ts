import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCoursesFromCourseCollectionExtraFilters } from "@entities/courseCollection";
import { GetAdminCoursesRequest } from "@entities/course";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<unknown, AdminCoursesFromCourseCollectionExtraFilters>,
): GetAdminCoursesRequest => {
    const { collectionIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            collectionIds: {
                items: [collectionIds],
                operator: "or",
            },
        },
    };
};
