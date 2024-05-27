import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateAdminSupportMessageResponse,
    $CreateSupportMessageResponse,
    $GetAdminSupportConversationResponse,
    $GetAdminSupportMessagesResponse,
    $GetSupportMessagesResponse,
    CreateAdminSupportMessageRequest,
    CreateAdminSupportMessageResponse,
    CreateSupportMessageRequest,
    CreateSupportMessageResponse,
    GetAdminSupportConversationResponse,
    GetAdminSupportConversationsRequest,
    GetAdminSupportMessagesRequest,
    GetAdminSupportMessagesResponse,
    GetSupportMessagesRequest,
    GetSupportMessagesResponse,
} from "./types";

class SupportApi extends BaseApi {
    //ADMIN
    async getAdminSupportConversations(params: GetAdminSupportConversationsRequest): Promise<GetAdminSupportConversationResponse> {
        const response = await this.instance.post("core/admin/support/list", params);
        return $GetAdminSupportConversationResponse.parse(response);
    }

    async getAdminSupportMessages({ conversationId, ...params }: GetAdminSupportMessagesRequest): Promise<GetAdminSupportMessagesResponse> {
        const response = await this.instance.post(`core/admin/support/${conversationId}/messages/list`, params);
        return $GetAdminSupportMessagesResponse.parse(response);
    }

    async createAdminSupportMessage({
        conversationId,
        ...data
    }: CreateAdminSupportMessageRequest): Promise<CreateAdminSupportMessageResponse> {
        const response = await this.instance.post(`core/admin/support/${conversationId}/messages`, data);
        return $CreateAdminSupportMessageResponse.parse(response);
    }

    //USER
    async getSupportMessages(data: GetSupportMessagesRequest): Promise<GetSupportMessagesResponse> {
        const response = await this.instance.post(`core/support/list`, data);
        return $GetSupportMessagesResponse.parse(response);
    }

    async createSupportMessage(data: CreateSupportMessageRequest): Promise<CreateSupportMessageResponse> {
        const response = await this.instance.post(`core/support`, data);
        return $CreateSupportMessageResponse.parse(response);
    }
}

export const supportApi = new SupportApi(axios);
