import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    GetAdminCoursesRequest,
    GetAdminCoursesResponse,
    GetCourseProgramModuleLessonsRequest,
    GetCourseProgramModuleLessonsResponse,
    GetCourseProgramResponse,
    GetMyCoursesResponse,
    GetCourseReviewsResponse,
    GetCourseTeachersResponse,
    GetAdminCourseResourcesResponse,
    $GetAdminCourseResourcesResponse,
    $GetAdminCoursesResponse,
    $GetMyCoursesResponse,
    $GetCourseProgramResponse,
    $GetCourseProgramModuleLessonsResponse,
    $GetCourseTeachersResponse,
    $GetCourseReviewsResponse,
} from "./types";

class CourseApi extends BaseApi {
    async getAdminCourseResources(): Promise<GetAdminCourseResourcesResponse> {
        const response = await this.instance.get("admin/courses/resources");
        return $GetAdminCourseResourcesResponse.parse(response);
    }

    async getAdminCourses(data: GetAdminCoursesRequest): Promise<GetAdminCoursesResponse> {
        const response = await this.instance.post("admin/courses/list", data);
        return $GetAdminCoursesResponse.parse(response);
    }

    async getMyCourses(): Promise<GetMyCoursesResponse> {
        const response = await this.instance.get("courses/my");
        return $GetMyCoursesResponse.parse(response);
    }

    async getCourseProgram(courseId: number): Promise<GetCourseProgramResponse> {
        const response = await this.instance.get(`courses/${courseId}/program`);
        return $GetCourseProgramResponse.parse(response);
    }

    async getCourseProgramModuleLessons({
        courseId,
        programId,
    }: GetCourseProgramModuleLessonsRequest): Promise<GetCourseProgramModuleLessonsResponse> {
        const response = await this.instance.get(`/courses/${courseId}/program/${programId}`);
        return $GetCourseProgramModuleLessonsResponse.parse(response);
    }

    async getCourseTeachers(): Promise<GetCourseTeachersResponse> {
        const response = await this.instance.get(`teachers`);
        return $GetCourseTeachersResponse.parse(response);
    }

    async getCourseReviews(courseId: number): Promise<GetCourseReviewsResponse> {
        const response = await this.instance.get(`courses/${courseId}/reviews`);
        return $GetCourseReviewsResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
