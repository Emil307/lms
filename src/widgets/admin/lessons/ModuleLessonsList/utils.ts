import { GetAdminLessonsFromModuleRequest } from "@entities/lesson";

export const getInitialValues = (moduleId: string): GetAdminLessonsFromModuleRequest => ({
    page: 1,
    perPage: 15,
    filter: {
        moduleIds: {
            items: [moduleId],
            operator: "or",
        },
    },
});
