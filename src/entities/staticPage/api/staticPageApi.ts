import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $getAboutResponse, $getContactsResponse, GetAboutResponse, GetContactsResponse } from "./types";

class StaticPageApi extends BaseApi {
    async getContacts(): Promise<GetContactsResponse> {
        const response = await this.instance.get("contacts");
        return $getContactsResponse.parse(response);
    }
    async getAbout(): Promise<GetAboutResponse> {
        const response = await this.instance.get("static-page/about");
        return $getAboutResponse.parse(response);
    }
}

export const staticPageApi = new StaticPageApi(axios);
