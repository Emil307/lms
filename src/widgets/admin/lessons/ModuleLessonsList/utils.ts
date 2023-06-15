import { GetAdminLessonsRequest } from "@entities/lesson";

export const getInitialValues = (moduleId: string): GetAdminLessonsRequest => ({
    page: 1,
    perPage: 15,
    filter: {
        moduleIds: {
            items: [moduleId],
            operator: "or",
        },
    },
});
