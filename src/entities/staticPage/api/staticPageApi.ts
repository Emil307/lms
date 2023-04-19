import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $advantage,
    $getAboutResponse,
    $getAdvantagesResponse,
    $getContactsResponse,
    $getFaqResponse,
    $getMainBannerResponse,
    $getPublicOfferResponse,
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
        return $getContactsResponse.parse(response);
    }
    async getAbout(): Promise<GetAboutResponse> {
        const response = await this.instance.get("static-page/about");
        return $getAboutResponse.parse(response);
    }
    async getPublicOffer(): Promise<GetPublicOfferResponse> {
        const response = await this.instance.get("static-page/publicOffer");
        return $getPublicOfferResponse.parse(response);
    }

    async getFaq(): Promise<GetFaqResponse> {
        const response = await this.instance.get("static-page/faq");
        return $getFaqResponse.parse(response);
    }

    async getMainBanner(): Promise<GetMainBannerResponse> {
        const response = await this.instance.get("static-page/indexBanner");
        return $getMainBannerResponse.parse(response);
    }

    async getAdvantages(params: GetAdvantagesRequest): Promise<GetAdvantagesResponse> {
        const response = await this.instance.get("static-page/advantages", {
            params,
        });
        return $getAdvantagesResponse.parse(response);
    }
    async getAdvantage(id: string): Promise<Advantage> {
        const response = await this.instance.get(`static-page/advantages/${id}`);
        return $advantage.parse(response);
    }

    async createAdvantage(data: CreateAdvantageRequest): Promise<Advantage> {
        const response = await this.instance.post("static-page/advantages", data);
        return $advantage.parse(response);
    }

    async updateAdvantage({ id, ...data }: UpdateAdvantageRequest & { id: string }): Promise<Advantage> {
        const response = await this.instance.put(`static-page/advantages/${id}`, data);
        return $advantage.parse(response);
    }

    async deleteAdvantage(id: string): Promise<void> {
        await this.instance.delete(`static-page/advantages/${id}`);
    }
}

export const staticPageApi = new StaticPageApi(axios);
