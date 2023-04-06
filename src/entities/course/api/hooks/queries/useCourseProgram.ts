import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi, GetCourseProgramResponse } from "@entities/course";

export const useCourseProgram = (courseId: number) => {
    //TODO: поменять на infinite загрузку при подключении реального эндпоинта API
    return useQuery<GetCourseProgramResponse>([QueryKeys.GET_COURSE_PROGRAM, courseId], () => courseApi.getCourseProgram(courseId));
};
