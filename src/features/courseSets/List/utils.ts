import { CourseSetsFiltersForm, GetCourseSetsRequest } from "@entities/courseSet";

export const getInitialParams = (perPage?: number) => ({
    page: 1,
    perPage: perPage || 6,
});

export const adaptGetCourseSetsRequest = (params: CourseSetsFiltersForm): GetCourseSetsRequest => {
    const { exceptionCourseSetId, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(exceptionCourseSetId && {
                id: {
                    items: [exceptionCourseSetId],
                    operator: "not",
                },
            }),
        },
    };
};
