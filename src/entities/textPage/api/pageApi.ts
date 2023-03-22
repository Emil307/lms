import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $getContactsResponse, GetContactsResponse } from "./types";

class PageApi extends BaseApi {
    async getContacts(): Promise<GetContactsResponse> {
        const response = await this.instance.get("contacts");
        return $getContactsResponse.parse(response);
    }
}

export const pageApi = new PageApi(axios);
