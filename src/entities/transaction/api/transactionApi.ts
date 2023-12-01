import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateAdminTransactionResponse,
    $DeleteAdminTransactionResponse,
    $GetAdminTransactionResponse,
    $GetAdminTransactionsCreateResourcesResponse,
    $GetAdminTransactionsFiltersResponse,
    $GetAdminTransactionsResponse,
    $GetTransactionsFiltersResponse,
    $GetTransactionsResponse,
    $UpdateAdminTransactionResponse,
    CreateAdminTransactionRequest,
    CreateAdminTransactionResponse,
    CreateFreeTransactionRequest,
    DeleteAdminTransactionRequest,
    DeleteAdminTransactionResponse,
    GetAdminTransactionRequest,
    GetAdminTransactionResponse,
    GetAdminTransactionsCreateResourcesResponse,
    GetAdminTransactionsFiltersResponse,
    GetAdminTransactionsRequest,
    GetAdminTransactionsResponse,
    GetTransactionsFiltersResponse,
    GetTransactionsRequest,
    GetTransactionsResponse,
    UpdateAdminTransactionRequest,
    UpdateAdminTransactionResponse,
} from "./types";

class TransactionApi extends BaseApi {
    //ADMIN
    async getAdminTransactions(params: GetAdminTransactionsRequest): Promise<GetAdminTransactionsResponse> {
        const response = await this.instance.post("admin/transactions/list", params);
        return $GetAdminTransactionsResponse.parse(response);
    }

    async getAdminTransaction({ id }: GetAdminTransactionRequest): Promise<GetAdminTransactionResponse> {
        const response = await this.instance.get(`admin/transactions/${id}`);
        return $GetAdminTransactionResponse.parse(response);
    }

    async getAdminTransactionsFilters(): Promise<GetAdminTransactionsFiltersResponse> {
        const response = await this.instance.get("admin/transactions/filters");
        return $GetAdminTransactionsFiltersResponse.parse(response);
    }

    async getAdminTransactionsCreateResources(): Promise<GetAdminTransactionsCreateResourcesResponse> {
        const response = await this.instance.get("admin/transactions/create");
        return $GetAdminTransactionsCreateResourcesResponse.parse(response);
    }

    async createAdminTransaction(data: CreateAdminTransactionRequest): Promise<CreateAdminTransactionResponse> {
        const response = await this.instance.post("admin/transactions", data);
        return $CreateAdminTransactionResponse.parse(response);
    }

    async updateAdminTransaction({ id, ...data }: UpdateAdminTransactionRequest): Promise<UpdateAdminTransactionResponse> {
        const response = await this.instance.put(`admin/transactions/${id}`, data);
        return $UpdateAdminTransactionResponse.parse(response);
    }

    async deleteAdminTransaction({ id }: DeleteAdminTransactionRequest): Promise<DeleteAdminTransactionResponse> {
        const response = await this.instance.delete(`admin/transactions/${id}`);
        return $DeleteAdminTransactionResponse.parse(response);
    }

    //USER
    async getTransactions(params: GetTransactionsRequest): Promise<GetTransactionsResponse> {
        const response = await this.instance.post("transactions/list", params);
        return $GetTransactionsResponse.parse(response);
    }

    async getTransactionsFilters(): Promise<GetTransactionsFiltersResponse> {
        const response = await this.instance.get("transactions/filters");
        return $GetTransactionsFiltersResponse.parse(response);
    }

    async createFreeTransaction(data: CreateFreeTransactionRequest): Promise<void> {
        return await this.instance.post("transactions", data);
    }
}

export const transactionApi = new TransactionApi(axios);
