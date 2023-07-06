import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    GetAdminCoursesRequest,
    GetAdminCoursesResponse,
    GetCourseProgramModuleLessonsRequest,
    GetCourseProgramModuleLessonsResponse,
    GetCourseProgramResponse,
    GetMyCoursesResponse,
    GetCourseTeachersResponse,
    GetAdminCourseResourcesResponse,
    $GetAdminCourseResourcesResponse,
    $GetAdminCoursesResponse,
    $GetMyCoursesResponse,
    $GetCourseProgramResponse,
    $GetCourseProgramModuleLessonsResponse,
    $GetCourseTeachersResponse,
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
    $GetCourseResourcesResponse,
    GetCourseResourcesResponse,
    UpdateCourseActivityRequest,
    UpdateCourseActivityResponse,
    $UpdateCourseActivityResponse,
    UpdateCourseTypeRequest,
    UpdateCourseTypeResponse,
    $UpdateCourseTypeResponse,
    UpdateCoursePopularityRequest,
    UpdateCoursePopularityResponse,
    $UpdateCoursePopularityResponse,
    UpdateCoursePublicationRequest,
    UpdateCoursePublicationResponse,
    $UpdateCoursePublicationResponse,
    GetAdminCourseResourcesRequest,
} from "./types";

class CourseApi extends BaseApi {
    async getAdminCourseResources(params: GetAdminCourseResourcesRequest): Promise<GetAdminCourseResourcesResponse> {
        const response = await this.instance.get("admin/courses/resources", { params });
        return $GetAdminCourseResourcesResponse.parse(response);
    }

    async getCourseResources(): Promise<GetCourseResourcesResponse> {
        const response = await this.instance.get("courses/resources");
        return $GetCourseResourcesResponse.parse(response);
    }

    async getAdminCourses(data: GetAdminCoursesRequest): Promise<GetAdminCoursesResponse> {
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

    async updateCourseActivity({ id, isActive }: UpdateCourseActivityRequest): Promise<UpdateCourseActivityResponse> {
        const response = await this.instance.put(`admin/courses/${id}/activity-status`, { isActive });
        return $UpdateCourseActivityResponse.parse(response);
    }

    async updateCourseType({ id, type }: UpdateCourseTypeRequest): Promise<UpdateCourseTypeResponse> {
        const response = await this.instance.put(`admin/courses/${id}/type`, { type });
        return $UpdateCourseTypeResponse.parse(response);
    }

    async updateCoursePopularity({ id, isPopular }: UpdateCoursePopularityRequest): Promise<UpdateCoursePopularityResponse> {
        const response = await this.instance.put(`admin/courses/${id}/popularity-status`, { isPopular });
        return $UpdateCoursePopularityResponse.parse(response);
    }

    async updateCoursePublication({ id, isFulfillment }: UpdateCoursePublicationRequest): Promise<UpdateCoursePublicationResponse> {
        const response = await this.instance.put(`admin/courses/${id}/fulfillment-status`, { isFulfillment });
        return $UpdateCoursePublicationResponse.parse(response);
    }

    async deleteCourse(id: string): Promise<void> {
        await this.instance.delete(`admin/courses/${id}`);
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
    //TODO: getCourseTeachers deprecated
    async getCourseTeachers(): Promise<GetCourseTeachersResponse> {
        const response = await this.instance.get(`teachers`);
        return $GetCourseTeachersResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
