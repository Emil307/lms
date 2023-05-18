import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $Advantage,
    $GetAboutResponse,
    $GetAdvantagesResponse,
    $GetContactsResponse,
    $GetFaqResponse,
    $GetMainBannerResponse,
    $GetPublicOfferResponse,
    Advantage,
    CreateAdvantageRequest,
    GetAboutResponse,
    GetAdvantagesRequest,
    GetAdvantagesResponse,
    GetContactsResponse,
    GetFaqResponse,
    GetMainBannerResponse,
    GetPublicOfferResponse,
    UpdateAdvantageRequest,
} from "./types";

class StaticPageApi extends BaseApi {
    async getContacts(): Promise<GetContactsResponse> {
        const response = await this.instance.get("static-page/contacts");
        return $GetContactsResponse.parse(response);
    }
    async getAbout(): Promise<GetAboutResponse> {
        const response = await this.instance.get("static-page/about");
        return $GetAboutResponse.parse(response);
    }
    async getPublicOffer(): Promise<GetPublicOfferResponse> {
        const response = await this.instance.get("static-page/publicOffer");
        return $GetPublicOfferResponse.parse(response);
    }

    async getFaq(): Promise<GetFaqResponse> {
        const response = await this.instance.post("static-page/faq/list", {
            paginate: false,
        });
        return $GetFaqResponse.parse(response);
    }

    async getMainBanner(): Promise<GetMainBannerResponse> {
        const response = await this.instance.get("static-page/indexBanner");
        return $GetMainBannerResponse.parse(response);
    }

    async getAdvantages(params: GetAdvantagesRequest): Promise<GetAdvantagesResponse> {
        const response = await this.instance.post("static-page/advantages/list", params);
        return $GetAdvantagesResponse.parse(response);
    }
    async getAdvantage(id: string): Promise<Advantage> {
        const response = await this.instance.get(`static-page/advantages/${id}`);
        return $Advantage.parse(response);
    }

    async createAdvantage(data: CreateAdvantageRequest): Promise<Advantage> {
        const response = await this.instance.post("static-page/advantages", data);
        return $Advantage.parse(response);
    }

    async updateAdvantage({ id, ...data }: UpdateAdvantageRequest & { id: string }): Promise<Advantage> {
        const response = await this.instance.put(`static-page/advantages/${id}`, data);
        return $Advantage.parse(response);
    }

    async deleteAdvantage(id: string): Promise<void> {
        await this.instance.delete(`static-page/advantages/${id}`);
    }
}

export const staticPageApi = new StaticPageApi(axios);
