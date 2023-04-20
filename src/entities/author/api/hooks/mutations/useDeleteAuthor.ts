import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteAuthor = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_AUTHOR, id], () => authorApi.deleteAuthor(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_AUTHORS]);
        },
    });
};
