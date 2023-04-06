import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { courseApi, GetCourseReviewsResponse } from "@entities/course";

export const useCourseReviews = (courseId: number) => {
    //TODO: поменять на infinite загрузку при подключении реального эндпоинта API
    return useQuery<GetCourseReviewsResponse>([QueryKeys.GET_COURSE_REVIEWS], () => courseApi.getCourseReviews(courseId));
};
