import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateAdminStaticReviewResponse,
    $DeleteStaticReviewResponse,
    $GetAdminStaticReviewResponse,
    $GetAdminStaticReviewsResponse,
    $GetStaticReviewResponse,
    $GetStaticReviewsResponse,
    $UpdateAdminStaticReviewResponse,
    $UpdateStaticReviewActivityResponse,
    CreateAdminStaticReviewRequest,
    CreateAdminStaticReviewResponse,
    DeleteStaticReviewRequest,
    DeleteStaticReviewResponse,
    GetAdminStaticReviewRequest,
    GetAdminStaticReviewResponse,
    GetAdminStaticReviewsRequest,
    GetAdminStaticReviewsResponse,
    GetStaticReviewRequest,
    GetStaticReviewResponse,
    GetStaticReviewsRequest,
    GetStaticReviewsResponse,
    UpdateAdminStaticReviewRequest,
    UpdateAdminStaticReviewResponse,
    UpdateStaticReviewActivityRequest,
    UpdateStaticReviewActivityResponse,
} from "./types";

class StaticReviewApi extends BaseApi {
    //ADMIN
    async getAdminStaticReviews(params: GetAdminStaticReviewsRequest): Promise<GetAdminStaticReviewsResponse> {
        const response = await this.instance.post("admin/static-reviews/list", params);
        return $GetAdminStaticReviewsResponse.parse(response);
    }

    async getAdminStaticReview({ id }: GetAdminStaticReviewRequest): Promise<GetAdminStaticReviewResponse> {
        const response = await this.instance.get(`admin/static-reviews/${id}`);
        return $GetAdminStaticReviewResponse.parse(response);
    }

    async createStaticReview(data: CreateAdminStaticReviewRequest): Promise<CreateAdminStaticReviewResponse> {
        const response = await this.instance.post("admin/static-reviews", data);
        return $CreateAdminStaticReviewResponse.parse(response);
    }
    async updateAdminStaticReview({ id, ...data }: UpdateAdminStaticReviewRequest): Promise<UpdateAdminStaticReviewResponse> {
        const response = await this.instance.put(`admin/static-reviews/${id}`, data);
        return $UpdateAdminStaticReviewResponse.parse(response);
    }

    async updateStaticReviewActivity({ id, isActive }: UpdateStaticReviewActivityRequest): Promise<UpdateStaticReviewActivityResponse> {
        const response = await this.instance.put(`admin/static-reviews/${id}/activity-status`, { isActive });
        return $UpdateStaticReviewActivityResponse.parse(response);
    }

    async deleteStaticReview({ id }: DeleteStaticReviewRequest): Promise<DeleteStaticReviewResponse> {
        const response = await this.instance.delete(`admin/static-reviews/${id}`);
        return $DeleteStaticReviewResponse.parse(response);
    }

    //USER
    async getStaticReviews(data: GetStaticReviewsRequest): Promise<GetStaticReviewsResponse> {
        const response = await this.instance.post("static-reviews/list", data);
        return $GetStaticReviewsResponse.parse(response);
    }

    async getStaticReview({ id }: GetStaticReviewRequest): Promise<GetStaticReviewResponse> {
        const response = await this.instance.get(`static-reviews/${id}`);
        return $GetStaticReviewResponse.parse(response);
    }
}

export const staticReviewApi = new StaticReviewApi(axios);
