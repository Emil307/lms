import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $getCourseProgramModuleLessonsResponse,
    $getCourseProgramResponse,
    $getMyCoursesResponse,
    GetCourseProgramModuleLessonsRequest,
    GetCourseProgramModuleLessonsResponse,
    GetCourseProgramResponse,
    GetMyCoursesResponse,
    GetCourseReviewsResponse,
    GetCourseTeachersResponse,
    $getCourseTeachersResponse,
    $getCourseReviewsResponse,
} from "./types";

class CourseApi extends BaseApi {
    async getMyCourses(): Promise<GetMyCoursesResponse> {
        const response = await this.instance.get("courses/my");
        return $getMyCoursesResponse.parse(response);
    }
    async getCourseProgram(courseId: number): Promise<GetCourseProgramResponse> {
        const response = await this.instance.get(`courses/${courseId}/program`);
        return $getCourseProgramResponse.parse(response);
    }
    async getCourseProgramModuleLessons({
        courseId,
        programId,
    }: GetCourseProgramModuleLessonsRequest): Promise<GetCourseProgramModuleLessonsResponse> {
        const response = await this.instance.get(`/courses/${courseId}/program/${programId}`);
        return $getCourseProgramModuleLessonsResponse.parse(response);
    }
    async getCourseTeachers(): Promise<GetCourseTeachersResponse> {
        const response = await this.instance.get(`teachers`);
        return $getCourseTeachersResponse.parse(response);
    }
    async getCourseReviews(courseId: number): Promise<GetCourseReviewsResponse> {
        const response = await this.instance.get(`courses/${courseId}/reviews`);
        return $getCourseReviewsResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
