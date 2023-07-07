import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $GetExternalIconsResponse, GetExternalIconsRequest, GetExternalIconsResponse } from "./types";

class ExternalIconApi extends BaseApi {
    async getExternalIcons(params: GetExternalIconsRequest): Promise<GetExternalIconsResponse> {
        const response = await this.instance.get("external-icons", { params });
        return $GetExternalIconsResponse.parse(response);
    }
}

export const externalIconApi = new ExternalIconApi(axios);
