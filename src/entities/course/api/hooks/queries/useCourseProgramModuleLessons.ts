import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi, GetCourseProgramModuleLessonsRequest, GetCourseProgramModuleLessonsResponse } from "@entities/course";

export const useCourseProgramModuleLessons = (params: GetCourseProgramModuleLessonsRequest) => {
    //TODO: поменять на infinite загрузку при подключении реального эндпоинта API
    return useQuery<GetCourseProgramModuleLessonsResponse>([QueryKeys.GET_COURSE_PROGRAM_LESSONS, params], () =>
        courseApi.getCourseProgramModuleLessons(params),
    );
};
