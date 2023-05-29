import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AdminStaticReview,
    $GetAdminStaticReviewsResponse,
    $UpdateStaticReviewActivityResponse,
    AdminStaticReview,
    CreateAdminStaticReviewRequest,
    GetAdminStaticReviewsRequest,
    GetAdminStaticReviewsResponse,
    UpdateAdminStaticReviewRequest,
    UpdateStaticReviewActivityRequest,
    UpdateStaticReviewActivityResponse,
} from "./types";

class StaticReviewApi extends BaseApi {
    async getAdminStaticReviews(params: GetAdminStaticReviewsRequest): Promise<GetAdminStaticReviewsResponse> {
        const response = await this.instance.post("admin/static-reviews/list", params);

        return $GetAdminStaticReviewsResponse.parse(response);
    }

    async getStaticReview(id: string): Promise<AdminStaticReview> {
        const response = await this.instance.get(`admin/static-reviews/${id}`);
        return $AdminStaticReview.parse(response);
    }

    async createStaticReview(data: CreateAdminStaticReviewRequest): Promise<AdminStaticReview> {
        const response = await this.instance.post("admin/static-reviews", data);
        return $AdminStaticReview.parse(response);
    }
    async updateAdminStaticReview({ id, ...data }: UpdateAdminStaticReviewRequest & { id?: number }): Promise<AdminStaticReview> {
        const response = await this.instance.put(`admin/static-reviews/${id}`, data);
        return $AdminStaticReview.parse(response);
    }

    async updateStaticReviewActivity({ id, isActive }: UpdateStaticReviewActivityRequest): Promise<UpdateStaticReviewActivityResponse> {
        const response = await this.instance.put(`admin/static-reviews/${id}/activity-status`, { isActive });
        return $UpdateStaticReviewActivityResponse.parse(response);
    }

    async deleteStaticReview(id: string): Promise<void> {
        await this.instance.delete(`admin/static-reviews/${id}`);
    }
}

export const staticReviewApi = new StaticReviewApi(axios);
