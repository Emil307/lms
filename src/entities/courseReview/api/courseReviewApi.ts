import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateCourseReviewResponse,
    $DeleteCourseReviewResponse,
    $GetAdminCourseReviewResourcesResponse,
    $GetAdminCourseReviewResponse,
    $GetAdminCourseReviewsResponse,
    $GetCourseReviewsResponse,
    $UpdateCourseReviewPublishingStatusResponse,
    CreateCourseReviewRequest,
    CreateCourseReviewResponse,
    DeleteCourseReviewRequest,
    DeleteCourseReviewResponse,
    GetAdminCourseReviewRequest,
    GetAdminCourseReviewResourcesRequest,
    GetAdminCourseReviewResourcesResponse,
    GetAdminCourseReviewResponse,
    GetAdminCourseReviewsRequest,
    GetAdminCourseReviewsResponse,
    GetCourseReviewsRequest,
    GetCourseReviewsResponse,
    UpdateCourseReviewPublishingStatusRequest,
    UpdateCourseReviewPublishingStatusResponse,
} from "./types";

class CourseReviewApi extends BaseApi {
    //ADMIN
    async getAdminCourseReviews(params: GetAdminCourseReviewsRequest): Promise<GetAdminCourseReviewsResponse> {
        const response = await this.instance.post("admin/course-reviews/list", params);
        return $GetAdminCourseReviewsResponse.parse(response);
    }

    async getAdminCourseReview({ id }: GetAdminCourseReviewRequest): Promise<GetAdminCourseReviewResponse> {
        const response = await this.instance.get(`admin/course-reviews/${id}`);
        return $GetAdminCourseReviewResponse.parse(response);
    }

    async getAdminCourseReviewsResources(params: GetAdminCourseReviewResourcesRequest): Promise<GetAdminCourseReviewResourcesResponse> {
        const response = await this.instance.get("admin/course-reviews/resources", { params });
        return $GetAdminCourseReviewResourcesResponse.parse(response);
    }

    async deleteCourseReview({ id }: DeleteCourseReviewRequest): Promise<DeleteCourseReviewResponse> {
        const response = await this.instance.delete(`admin/course-reviews/${id}`);
        return $DeleteCourseReviewResponse.parse(response);
    }

    async updateCourseReviewPublishingStatus({
        id,
        ...params
    }: UpdateCourseReviewPublishingStatusRequest): Promise<UpdateCourseReviewPublishingStatusResponse> {
        const response = await this.instance.put(`admin/course-reviews/${id}/publishing-status`, params);
        return $UpdateCourseReviewPublishingStatusResponse.parse(response);
    }
    //USER
    async getCourseReviews(params: GetCourseReviewsRequest): Promise<GetCourseReviewsResponse> {
        const response = await this.instance.post("course-reviews/list", params);
        return $GetCourseReviewsResponse.parse(response);
    }

    async createCourseReview(data: CreateCourseReviewRequest): Promise<CreateCourseReviewResponse> {
        const response = await this.instance.post("course-reviews", data);
        return $CreateCourseReviewResponse.parse(response);
    }
}

export const courseReviewApi = new CourseReviewApi(axios);
