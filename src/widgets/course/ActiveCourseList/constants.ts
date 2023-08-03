import { GetGroupsRequest } from "@entities/group";

export const initialParams = {
    page: 1,
    perPage: 3,
};

export const initialParamsForNewCourses: GetGroupsRequest = {
    ...initialParams,
    filter: {
        status: "notStarted",
    },
};

export const initialParamsForCoursesInProgress: GetGroupsRequest = {
    ...initialParams,
    filter: {
        status: "inProgress",
    },
};
