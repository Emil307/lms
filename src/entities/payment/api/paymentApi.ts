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
    async cratePaymentAcquiring(data: CreatePaymentAcquiringRequest): Promise<CreatePaymentAcquiringResponse> {
        const response = await this.instance.post("payment/make-order", data);
        return $CreatePaymentAcquiringResponse.parse(response);
    }

    async createInvoiceForPaymentCourse({ entityId, ...data }: CreateInvoiceForPaymentRequest): Promise<TFileDownloadResponse> {
        return await this.instance.post(`payment-invoices/courses/${entityId}`, data);
    }

    async createInvoiceForPaymentCoursePackage({ entityId, ...data }: CreateInvoiceForPaymentRequest): Promise<TFileDownloadResponse> {
        return await this.instance.post(`payment-invoices/course-packages/${entityId}`, data);
    }

    async createInvoiceForPaymentArticlePackage({ entityId, ...data }: CreateInvoiceForPaymentRequest): Promise<TFileDownloadResponse> {
        return await this.instance.post(`payment-invoices/article-packages/${entityId}`, data);
    }
}

export const paymentApi = new PaymentApi(axios);
