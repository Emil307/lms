import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { paymentApi } from "../../paymentApi";
import { CreatePaymentAcquiringRequest, CreatePaymentAcquiringResponse } from "../../types";

export const useCreatePaymentAcquiring = (): UseMutationResult<
    CreatePaymentAcquiringResponse,
    AxiosError<FormErrorResponse>,
    CreatePaymentAcquiringRequest
> => {
    return useMutation(
        [MutationKeys.CREATE_PAYMENT_ACQUIRING],
        (data: CreatePaymentAcquiringRequest) => paymentApi.cratePaymentAcquiring(data),
        {
            onError: (error) => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка формирование ссылки на оплату",
                    message: error.response?.data.message,
                });
            },
        }
    );
};
