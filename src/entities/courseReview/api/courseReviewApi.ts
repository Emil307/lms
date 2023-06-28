import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $DeleteCourseReviewResponse,
    $GetAdminCourseReviewResourcesResponse,
    $GetAdminCourseReviewResponse,
    $GetAdminCourseReviewsResponse,
    $UpdateCourseReviewPublishingStatusResponse,
    DeleteCourseReviewRequest,
    DeleteCourseReviewResponse,
    GetAdminCourseReviewRequest,
    GetAdminCourseReviewResourcesResponse,
    GetAdminCourseReviewResponse,
    GetAdminCourseReviewsRequest,
    GetAdminCourseReviewsResponse,
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

    async getAdminCourseReviewsResources(): Promise<GetAdminCourseReviewResourcesResponse> {
        const response = await this.instance.get("admin/course-reviews/resources");
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
}

export const courseReviewApi = new CourseReviewApi(axios);
