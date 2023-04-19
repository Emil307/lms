import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useActivateStaticReview = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, void, unknown>(
        [MutationKeys.ACTIVATE_STATIC_REVIEW],
        () => staticReviewApi.activateStaticReview(id),
        {
            // onMutate: async () => {
            //     // Cancel any outgoing refetches
            //     // (so they don't overwrite our optimistic update)
            //     await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEW, id] });

            //     // Snapshot the previous value
            //     const previous = queryClient.getQueryData([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);

            //     // Optimistically update to the new value
            //     queryClient.setQueryData(["todos", newTodo.id], newTodo);

            //     // Return a context with the previous and new todo
            //     return { previousTodo, newTodo };
            // },
            // onError: (err, _newValue, context) => {
            //     queryClient.setQueryData(["todos"], context.previousTodos);
            // },
            // // Always refetch after error or success:
            // onSettled: () => {
            //     queryClient.invalidateQueries({ queryKey: ["todos"] });
            // },
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
        }
    );
};
