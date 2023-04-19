import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { Advantage, CreateAdvantageRequest, staticPageApi } from "@entities/staticPage";

export const useCreateAdvantage = () => {
    return useMutation<Advantage, AxiosError<FormErrorResponse>, CreateAdvantageRequest>(
        [MutationKeys.CREATE_ADVANTAGE],
        (data) => staticPageApi.createAdvantage(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADVANTAGES]);
            },
        }
    );
};
