import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AttachAdminCoursesToCourseCollectionResponse,
    $CourseCollectionFromListArray,
    $CreateAdminCourseCollectionResponse,
    $DeleteAdminCourseCollectionResponse,
    $DeleteAdminCourseFromCourseCollectionResponse,
    $GetAdminCourseCollectionResourcesResponse,
    $GetAdminCourseCollectionResponse,
    $GetAdminCourseCollectionsResponse,
    $GetCourseCollectionResponse,
    $GetCourseCollectionsResponse,
    $GetRandomCourseCollectionResponse,
    $UpdateAdminCourseCollectionActivityResponse,
    $UpdateAdminCourseCollectionResponse,
    AttachAdminCoursesToCourseCollectionRequest,
    AttachAdminCoursesToCourseCollectionResponse,
    CreateAdminCourseCollectionRequest,
    CreateAdminCourseCollectionResponse,
    DeleteAdminCourseCollectionRequest,
    DeleteAdminCourseCollectionResponse,
    DeleteAdminCourseFromCourseCollectionRequest,
    DeleteAdminCourseFromCourseCollectionResponse,
    GetAdminCourseCollectionRequest,
    GetAdminCourseCollectionResourcesRequest,
    GetAdminCourseCollectionResourcesResponse,
    GetAdminCourseCollectionResponse,
    GetAdminCourseCollectionsRequest,
    GetAdminCourseCollectionsResponse,
    GetAllCourseCollectionsResponse,
    GetCourseCollectionRequest,
    GetCourseCollectionResponse,
    GetCourseCollectionsRequest,
    GetCourseCollectionsResponse,
    GetRandomCourseCollectionResponse,
    UpdateAdminCourseCollectionActivityRequest,
    UpdateAdminCourseCollectionActivityResponse,
    UpdateAdminCourseCollectionRequest,
    UpdateAdminCourseCollectionResponse,
} from "./types";

export class CourseCollectionApi extends BaseApi {
    //ADMIN
    async getAdminCourseCollections(data: GetAdminCourseCollectionsRequest): Promise<GetAdminCourseCollectionsResponse> {
        const response = await this.instance.post("courses/admin/course-collections/list", data);
        return $GetAdminCourseCollectionsResponse.parse(response);
    }

    async getAdminCourseCollection({ id }: GetAdminCourseCollectionRequest): Promise<GetAdminCourseCollectionResponse> {
        const response = await this.instance.get(`courses/admin/course-collections/${id}`);
        return $GetAdminCourseCollectionResponse.parse(response);
    }

    async getAdminCourseCollectionResources(
        params: GetAdminCourseCollectionResourcesRequest
    ): Promise<GetAdminCourseCollectionResourcesResponse> {
        const response = await this.instance.get("courses/admin/course-collections/resources", { params });
        return $GetAdminCourseCollectionResourcesResponse.parse(response);
    }

    async createAdminCourseCollection(data: CreateAdminCourseCollectionRequest): Promise<CreateAdminCourseCollectionResponse> {
        const response = await this.instance.post("courses/admin/course-collections", data);
        return $CreateAdminCourseCollectionResponse.parse(response);
    }

    async updateAdminCourseCollection({ id, ...data }: UpdateAdminCourseCollectionRequest): Promise<UpdateAdminCourseCollectionResponse> {
        const response = await this.instance.put(`courses/admin/course-collections/${id}`, data);
        return $UpdateAdminCourseCollectionResponse.parse(response);
    }

    async updateAdminCourseCollectionActivity({
        id,
        ...data
    }: UpdateAdminCourseCollectionActivityRequest): Promise<UpdateAdminCourseCollectionActivityResponse> {
        const response = await this.instance.put(`courses/admin/course-collections/${id}/activity-status`, data);
        return $UpdateAdminCourseCollectionActivityResponse.parse(response);
    }

    async deleteAdminCourseCollection({ id }: DeleteAdminCourseCollectionRequest): Promise<DeleteAdminCourseCollectionResponse> {
        const response = await this.instance.delete(`courses/admin/course-collections/${id}`);
        return $DeleteAdminCourseCollectionResponse.parse(response);
    }

    // COURSE_COLLECTION <--> COURSES
    async attachAdminCoursesToCourseCollection({
        courseCollectionId,
        ...rest
    }: AttachAdminCoursesToCourseCollectionRequest): Promise<AttachAdminCoursesToCourseCollectionResponse> {
        const response = await this.instance.post(`courses/admin/course-collections/${courseCollectionId}/courses`, rest);
        return $AttachAdminCoursesToCourseCollectionResponse.parse(response);
    }

    async deleteAdminCourseFromCourseCollection({
        courseCollectionId,
        ...params
    }: DeleteAdminCourseFromCourseCollectionRequest): Promise<DeleteAdminCourseFromCourseCollectionResponse> {
        const response = await this.instance.delete(`courses/admin/course-collections/${courseCollectionId}/courses`, { params });
        return $DeleteAdminCourseFromCourseCollectionResponse.parse(response);
    }

    //USER
    async getCourseCollectionsPaginate(data: GetCourseCollectionsRequest): Promise<GetCourseCollectionsResponse> {
        const response = await this.instance.post("courses/course-collections/list", data);
        return $GetCourseCollectionsResponse.parse(response);
    }
    async getCourseCollections(data: GetCourseCollectionsRequest): Promise<GetAllCourseCollectionsResponse> {
        const response = await this.instance.post("courses/course-collections/list", data);
        return $CourseCollectionFromListArray.parse(response);
    }

    async getCourseCollection({ id }: GetCourseCollectionRequest): Promise<GetCourseCollectionResponse> {
        const response = await this.instance.get(`courses/course-collections/${id}`);
        return $GetCourseCollectionResponse.parse(response);
    }

    async getRandomCourseCollection(): Promise<GetRandomCourseCollectionResponse> {
        const response = await this.instance.post(`courses/course-collections/list/random`);
        return $GetRandomCourseCollectionResponse.parse(response);
    }
}

export const courseCollectionApi = new CourseCollectionApi(axios);
