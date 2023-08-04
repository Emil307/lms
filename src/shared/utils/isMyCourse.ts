import { GetCourseResponse, MyCourse } from "@entities/course";

export const isMyCourse = (item: GetCourseResponse): item is MyCourse => {
    return "courseId" in item && "groupId" in item;
};
