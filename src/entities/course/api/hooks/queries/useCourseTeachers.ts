import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi, GetCourseTeachersResponse } from "@entities/course";

export const useCourseTeachers = () => {
    //TODO: поменять на infinite загрузку при подключении реального эндпоинта API
    return useQuery<GetCourseTeachersResponse>([QueryKeys.GET_TEACHERS], () => courseApi.getCourseTeachers());
};
