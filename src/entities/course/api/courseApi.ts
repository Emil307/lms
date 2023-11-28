import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    GetAdminCoursesRequest,
    GetAdminCoursesResponse,
    GetAdminCourseResourcesResponse,
    $GetAdminCourseResourcesResponse,
    $GetAdminCoursesResponse,
    GetCoursesResponse,
    $GetCoursesResponse,
    GetCoursesRequest,
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
    GetCourseResourcesRequest,
    GetCourseRequest,
    GetCourseResponse,
    $GetCourseResponse,
    DeleteFavoriteCoursesResponse,
    $DeleteFavoriteCoursesResponse,
    UpdateCourseFavoriteStatusRequest,
    UpdateCourseFavoriteStatusResponse,
    $UpdateCourseFavoriteStatusResponse,
    AttachArticlesToCourseRequest,
    AttachArticlesToCourseResponse,
    $AttachArticlesToCourseResponse,
    DeleteCourseArticlesRequest,
    DeleteCourseArticlesResponse,
    $DeleteCourseArticlesResponse,
    DeleteCourseRequest,
    DeleteCourseResponse,
    $DeleteCourseResponse,
    GetAdminStudentCoursesRequest,
    GetAdminStudentCoursesResponse,
    $GetAdminStudentCoursesResponse,
    AttachCoursesToStudentRequest,
    AttachCoursesToStudentResponse,
    $AttachCoursesToStudentResponse,
    $DeleteStudentCoursesResponse,
    DeleteStudentCoursesRequest,
    DeleteStudentCoursesResponse,
    GetAdminCourseStatisticsResponse,
    $GetAdminCourseStatisticsResponse,
    GetAdminCourseStatisticsRequest,
} from "./types";

export class CourseApi extends BaseApi {
    //ADMIN
    async getAdminCourseResources(params: GetAdminCourseResourcesRequest): Promise<GetAdminCourseResourcesResponse> {
        const response = await this.instance.get("admin/courses/resources", { params });
        return $GetAdminCourseResourcesResponse.parse(response);
    }

    async getAdminCourses(data: GetAdminCoursesRequest): Promise<GetAdminCoursesResponse> {
        const response = await this.instance.post("admin/courses/list", data);
        return $GetAdminCoursesResponse.parse(response);
    }

    async getAdminCourse(id: string): Promise<GetAdminCourseResponse> {
        const response = await this.instance.get(`admin/courses/${id}`);
        return $GetAdminCourseResponse.parse(response);
    }

    async getAdminCourseStatistics({ courseId, ...params }: GetAdminCourseStatisticsRequest): Promise<GetAdminCourseStatisticsResponse> {
        const response = await this.instance.get(`admin/courses/${courseId}/statistics`, { params });
        return $GetAdminCourseStatisticsResponse.parse(response);
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

    async deleteCourse({ id }: DeleteCourseRequest): Promise<DeleteCourseResponse> {
        const response = await this.instance.delete(`admin/courses/${id}`);
        return $DeleteCourseResponse.parse(response);
    }

    //COURSES <---> STUDENTS ADMIN
    async getAdminStudentCourses({ studentId, ...data }: GetAdminStudentCoursesRequest): Promise<GetAdminStudentCoursesResponse> {
        const response = await this.instance.post(`admin/users/${studentId}/courses/list`, data);
        return $GetAdminStudentCoursesResponse.parse(response);
    }

    async attachCoursesToStudent({ studentId, ...data }: AttachCoursesToStudentRequest): Promise<AttachCoursesToStudentResponse> {
        const response = await this.instance.post(`admin/users/${studentId}/courses`, data);
        return $AttachCoursesToStudentResponse.parse(response);
    }

    async deleteStudentCourses({ studentId, ...params }: DeleteStudentCoursesRequest): Promise<DeleteStudentCoursesResponse> {
        const response = await this.instance.delete(`admin/users/${studentId}/courses`, { params });
        return $DeleteStudentCoursesResponse.parse(response);
    }

    //COURSES <---> ARTICLES ADMIN
    async attachArticlesToCourse({ courseId, ...data }: AttachArticlesToCourseRequest): Promise<AttachArticlesToCourseResponse> {
        const response = await this.instance.post(`admin/courses/${courseId}/articles`, data);
        return $AttachArticlesToCourseResponse.parse(response);
    }

    async deleteCourseArticles({ courseId, ...data }: DeleteCourseArticlesRequest): Promise<DeleteCourseArticlesResponse> {
        const response = await this.instance.delete(`admin/courses/${courseId}/articles`, { data });
        return $DeleteCourseArticlesResponse.parse(response);
    }

    //USER
    async getCourseResources(params: GetCourseResourcesRequest): Promise<GetCourseResourcesResponse> {
        const response = await this.instance.get("courses/resources", { params });
        return $GetCourseResourcesResponse.parse(response);
    }

    async getCourses(data: GetCoursesRequest): Promise<GetCoursesResponse> {
        const response = await this.instance.post("courses/list", data);
        return $GetCoursesResponse.parse(response);
    }

    async getCourse({ id }: GetCourseRequest): Promise<GetCourseResponse> {
        const response = await this.instance.get(`courses/${id}`);
        return $GetCourseResponse.parse(response);
    }

    async updateCourseFavoriteStatus({ id, ...data }: UpdateCourseFavoriteStatusRequest): Promise<UpdateCourseFavoriteStatusResponse> {
        const response = await this.instance.put(`courses/${id}/favorite-status`, data);
        return $UpdateCourseFavoriteStatusResponse.parse(response);
    }

    async deleteFavoriteCourses(): Promise<DeleteFavoriteCoursesResponse> {
        const response = await this.instance.delete("courses/favorites");
        return $DeleteFavoriteCoursesResponse.parse(response);
    }
}

export const courseApi = new CourseApi(axios);
