import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $adminStaticReviewDetail,
    $getAdminStaticReviewsResponse,
    AdminStaticReviewDetail,
    CreateAdminStaticReviewRequest,
    GetAdminStaticReviewsRequest,
    GetAdminStaticReviewsResponse,
    UpdateAdminStaticReviewRequest,
} from "./types";

class StaticReviewApi extends BaseApi {
    async getAdminStaticReviews(params: GetAdminStaticReviewsRequest): Promise<GetAdminStaticReviewsResponse> {
        const response = await this.instance.get("admin/static-reviews", {
            params,
        });

        return $getAdminStaticReviewsResponse.parse(response);
    }

    async getStaticReview(id: string): Promise<AdminStaticReviewDetail> {
        const response = await this.instance.get(`admin/static-reviews/${id}`);
        return $adminStaticReviewDetail.parse(response);
    }

    async createStaticReview(data: CreateAdminStaticReviewRequest): Promise<AdminStaticReviewDetail> {
        const response = await this.instance.post("admin/static-reviews", data);
        return $adminStaticReviewDetail.parse(response);
    }
    async updateAdminStaticReview(id: string, data: UpdateAdminStaticReviewRequest): Promise<AdminStaticReviewDetail> {
        const response = await this.instance.put(`admin/static-reviews/${id}`, data);
        return $adminStaticReviewDetail.parse(response);
    }

    async activateStaticReview(id: string): Promise<void> {
        await this.instance.put(`admin/static-reviews/${id}/activate`);
    }

    async deactivateStaticReview(id: string): Promise<void> {
        await this.instance.put(`admin/static-reviews/${id}/deactivate`);
    }

    async deleteStaticReview(id: string): Promise<void> {
        await this.instance.delete(`admin/static-reviews/${id}`);
    }
}

export const staticReviewApi = new StaticReviewApi(axios);
