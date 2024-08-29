import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { TFileDownloadResponse } from "@app/config/axios/types";
import {
    $CreatePaymentAcquiringResponse,
    CreateInvoiceForPaymentRequest,
    CreatePaymentAcquiringRequest,
    CreatePaymentAcquiringResponse,
} from "./types";

class PaymentApi extends BaseApi {
    async createPaymentAcquiring({ service, ...data }: CreatePaymentAcquiringRequest): Promise<CreatePaymentAcquiringResponse> {
        const response = await this.instance.post(`core/payment/${service}/make-order`, data);
        return $CreatePaymentAcquiringResponse.parse(response);
    }

    async createInvoiceForPaymentCourse({ entityId, ...data }: CreateInvoiceForPaymentRequest): Promise<TFileDownloadResponse> {
        return await this.instance.post(`core/payment-invoices/courses/${entityId}`, data);
    }

    async createInvoiceForPaymentArticlePackage({ entityId, ...data }: CreateInvoiceForPaymentRequest): Promise<TFileDownloadResponse> {
        return await this.instance.post(`core/payment-invoices/article-packages/${entityId}`, data);
    }
}

export const paymentApi = new PaymentApi(axios);
