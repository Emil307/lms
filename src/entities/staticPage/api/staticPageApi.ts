import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AdminFaqItem,
    $Advantage,
    $GetAboutResponse,
    $GetAdminFaqResponse,
    $GetAdvantagesResponse,
    $GetContactsResponse,
    $GetFaqResponse,
    $GetMainBannerResponse,
    $GetPublicOfferResponse,
    $UpdateFaqActivityStatusResponse,
    AdminFaqItem,
    Advantage,
    CreateAdvantageRequest,
    CreateFaqRequest,
    GetAboutResponse,
    GetAdminFaqResponse,
    GetAdvantagesRequest,
    GetAdvantagesResponse,
    GetContactsResponse,
    GetFaqResponse,
    GetMainBannerResponse,
    GetPublicOfferResponse,
    UpdateAboutRequest,
    UpdateAdvantageRequest,
    UpdateMainBannerRequest,
    UpdateContactsRequest,
    UpdateFaqActivityStatusRequest,
    UpdateFaqActivityStatusResponse,
    UpdateFaqOrderRequest,
    UpdateFaqRequest,
    UpdatePublicOfferRequest,
    GetAdminAdvantagesResponse,
    $GetAdminAdvantagesResponse,
    GetFaqRequest,
} from "./types";

class StaticPageApi extends BaseApi {
    //ABOUT
    async getAbout(): Promise<GetAboutResponse> {
        const response = await this.instance.get("core/static-page/about");
        return $GetAboutResponse.parse(response);
    }

    async updateAbout(data: UpdateAboutRequest): Promise<GetAboutResponse> {
        const response = await this.instance.put("core/admin/static-page/about", data);
        return $GetAboutResponse.parse(response);
    }

    //CONTACTS
    async getContacts(): Promise<GetContactsResponse> {
        const response = await this.instance.get("core/static-page/contacts");
        return $GetContactsResponse.parse(response);
    }

    async updateContacts(data: UpdateContactsRequest): Promise<GetContactsResponse> {
        const response = await this.instance.put("core/admin/static-page/contacts", data);
        return $GetContactsResponse.parse(response);
    }

    //PUBLIC_OFFER
    async getPublicOffer(): Promise<GetPublicOfferResponse> {
        const response = await this.instance.get("core/static-page/publicOffer");
        return $GetPublicOfferResponse.parse(response);
    }

    async updatePublicOffer(data: UpdatePublicOfferRequest): Promise<GetPublicOfferResponse> {
        const response = await this.instance.put("core/admin/static-page/publicOffer", data);
        return $GetPublicOfferResponse.parse(response);
    }

    //ADVANTAGES
    async getAdvantages(params: GetAdvantagesRequest): Promise<GetAdvantagesResponse> {
        const response = await this.instance.post("core/static-page/advantages/list", params);
        return $GetAdvantagesResponse.parse(response);
    }
    async getAdminAdvantages(data: GetAdvantagesRequest): Promise<GetAdminAdvantagesResponse> {
        const response = await this.instance.post("core/admin/static-page/advantages/list", data);
        return $GetAdminAdvantagesResponse.parse(response);
    }
    async getAdvantage(id: number): Promise<Advantage> {
        const response = await this.instance.get(`core/admin/static-page/advantages/${id}`);
        return $Advantage.parse(response);
    }

    async createAdvantage(data: CreateAdvantageRequest): Promise<Advantage> {
        const response = await this.instance.post("core/admin/static-page/advantages", data);
        return $Advantage.parse(response);
    }

    async updateAdvantage({ id, ...data }: UpdateAdvantageRequest & { id?: number }): Promise<Advantage> {
        const response = await this.instance.put(`core/admin/static-page/advantages/${id}`, data);
        return $Advantage.parse(response);
    }

    async deleteAdvantage(id: string): Promise<void> {
        await this.instance.delete(`core/admin/static-page/advantages/${id}`);
    }

    //MAIN_BANNER
    async getMainBanner(): Promise<GetMainBannerResponse> {
        const response = await this.instance.get("core/static-page/indexBanner");
        return $GetMainBannerResponse.parse(response);
    }

    async updateMainBanner(data: UpdateMainBannerRequest): Promise<GetMainBannerResponse> {
        const response = await this.instance.put("core/admin/static-page/indexBanner", data);
        return $GetMainBannerResponse.parse(response);
    }

    //FAQ
    async getFaq(params: GetFaqRequest): Promise<GetFaqResponse> {
        const response = await this.instance.post("core/static-page/faq/list", params);
        return $GetFaqResponse.parse(response);
    }

    async getAdminFaq(): Promise<GetAdminFaqResponse> {
        const response = await this.instance.post("core/admin/static-page/faq/list");
        return $GetAdminFaqResponse.parse(response);
    }

    async createFaq(data: CreateFaqRequest): Promise<AdminFaqItem> {
        const response = await this.instance.post("core/admin/static-page/faq", data);
        return $AdminFaqItem.parse(response);
    }

    async updateFaq({ id, ...data }: UpdateFaqRequest): Promise<AdminFaqItem> {
        const response = await this.instance.put(`core/admin/static-page/faq/${id}`, data);
        return $AdminFaqItem.parse(response);
    }

    async updateFaqOrder({ id, ...data }: UpdateFaqOrderRequest): Promise<AdminFaqItem> {
        const response = await this.instance.put(`core/admin/static-page/faq/${id}/change-order`, data);
        return $AdminFaqItem.parse(response);
    }
    async updateActivityStatusFaq({ id, isActive }: UpdateFaqActivityStatusRequest): Promise<UpdateFaqActivityStatusResponse> {
        const response = await this.instance.put(`core/admin/static-page/faq/${id}/activity-status`, { isActive });
        return $UpdateFaqActivityStatusResponse.parse(response);
    }

    async deleteFaq(id: number): Promise<void> {
        await this.instance.delete(`core/admin/static-page/faq/${id}`);
    }
}

export const staticPageApi = new StaticPageApi(axios);
