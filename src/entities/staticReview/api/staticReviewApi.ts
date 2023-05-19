import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $adminStaticReview,
    $getAdminStaticReviewsResponse,
    $updateActivityStaticReviewResponse,
    AdminStaticReview,
    CreateAdminStaticReviewRequest,
    GetAdminStaticReviewsRequest,
    GetAdminStaticReviewsResponse,
    UpdateActivityStaticReviewRequest,
    UpdateActivityStaticReviewResponse,
    UpdateAdminStaticReviewRequest,
} from "./types";

class StaticReviewApi extends BaseApi {
    async getAdminStaticReviews(params: GetAdminStaticReviewsRequest): Promise<GetAdminStaticReviewsResponse> {
        const response = await this.instance.post("admin/static-reviews/list", params);

        return $getAdminStaticReviewsResponse.parse(response);
    }

    async getStaticReview(id: string): Promise<AdminStaticReview> {
        const response = await this.instance.get(`admin/static-reviews/${id}`);
        return $adminStaticReview.parse(response);
    }

    async createStaticReview(data: CreateAdminStaticReviewRequest): Promise<AdminStaticReview> {
        const response = await this.instance.post("admin/static-reviews", data);
        return $adminStaticReview.parse(response);
    }
    async updateAdminStaticReview({ id, ...data }: UpdateAdminStaticReviewRequest & { id?: number }): Promise<AdminStaticReview> {
        const response = await this.instance.put(`admin/static-reviews/${id}`, data);
        return $adminStaticReview.parse(response);
    }

    async updateActivityStatusStaticReview({
        id,
        isActive,
    }: UpdateActivityStaticReviewRequest): Promise<UpdateActivityStaticReviewResponse> {
        const response = await this.instance.put(`admin/static-reviews/${id}/activity-status`, { isActive });
        return $updateActivityStaticReviewResponse.parse(response);
    }

    async deleteStaticReview(id: string): Promise<void> {
        await this.instance.delete(`admin/static-reviews/${id}`);
    }
}

export const staticReviewApi = new StaticReviewApi(axios);
