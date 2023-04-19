import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteAdvantage = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADVANTAGE, id],
        () => staticPageApi.deleteAdvantage(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADVANTAGES]);
            },
        }
    );
};
