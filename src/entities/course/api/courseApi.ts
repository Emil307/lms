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
    GetCoursesResponse,
    $GetCoursesResponse,
    GetCoursesRequest,
    GetCoursesInfiniteRequest,
    $CreateCourseResponse,
    CreateCourseRequest,
    UpdateCourseRequest,
    CreateCourseResponse,
    UpdateCourseResponse,
    $UpdateCourseResponse,
    GetAdminCourseResponse,
    $GetAdminCourseResponse,
    GetAdminCoursesWithoutCoursesFromCoursePackageRequest,
} from "./types";

class CourseApi extends BaseApi {
    async getAdminCourseResources(): Promise<GetAdminCourseResourcesResponse> {
        const response = await this.instance.get("admin/courses/resources");
        return $GetAdminCourseResourcesResponse.parse(response);
    }

    async getAdminCourses(
        data: GetAdminCoursesRequest | GetAdminCoursesWithoutCoursesFromCoursePackageRequest
    ): Promise<GetAdminCoursesResponse> {
        const response = await this.instance.post("admin/courses/list", data);
        return $GetAdminCoursesResponse.parse(response);
    }

    async getAdminCourse(id: string): Promise<GetAdminCourseResponse> {
        const response = await this.instance.get(`admin/courses/${id}`);
        return $GetAdminCourseResponse.parse(response);
    }

    async createCourse(data: CreateCourseRequest): Promise<CreateCourseResponse> {
        const response = await this.instance.post("admin/courses", data);
        return $CreateCourseResponse.parse(response);
    }

    async updateCourse({ id, ...data }: UpdateCourseRequest): Promise<UpdateCourseResponse> {
        const response = await this.instance.put(`admin/courses/${id}`, data);
        return $UpdateCourseResponse.parse(response);
    }

    async getCourses(data: GetCoursesRequest | GetCoursesInfiniteRequest): Promise<GetCoursesResponse> {
        const response = await this.instance.post("courses/list", data);
        return $GetCoursesResponse.parse(response);
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
