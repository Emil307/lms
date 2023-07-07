import { CourseCollectionsExtraFilters, GetCourseCollectionsRequest } from "@entities/courseCollection";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const getInitialParams = (perPage?: number) => ({
    page: 1,
    perPage: perPage || 6,
});

export const adaptGetCourseCollectionsRequest = (
    params: TFunctionParams<unknown, CourseCollectionsExtraFilters>,
): GetCourseCollectionsRequest => {
    const { id, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(id && {
                id: {
                    items: [id],
                    operator: "not",
                },
            }),
        },
    };
};
