import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authorApi, Author, UpdateAuthorRequest, GetAuthorsResponse } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useUpdateAuthor = (id: string) => {
    return useMutation<Author, AxiosError<FormErrorResponse>, UpdateAuthorRequest>(
        [MutationKeys.UPDATE_AUTHOR, id],
        (data) => authorApi.updateAuthor(id, data),
        {
            onMutate: async (newAuthorData) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_AUTHOR, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_AUTHORS] });

                const previousAuthorData = queryClient.getQueryData<Author>([QueryKeys.GET_AUTHOR, id]);
                const previousAuthorsData = queryClient.getQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS]);

                queryClient.setQueryData<Author>(
                    [QueryKeys.GET_AUTHOR, id],
                    (previousData) => previousData && { ...previousData, ...newAuthorData, avatar: newAuthorData.avatar?.absolutePath }
                );

                queryClient.setQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((author) =>
                            String(author.id) === id ? { ...author, ...newAuthorData, avatar: newAuthorData.avatar?.absolutePath } : author
                        ),
                    };
                });

                return { previousAuthorData, previousAuthorsData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousAuthorData" in context) {
                    queryClient.setQueryData<Author>([QueryKeys.GET_AUTHOR, id], context.previousAuthorData as Author);
                }
                if (typeof context === "object" && context !== null && "previousAuthorsData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_AUTHORS], context.previousAuthorsData);
                }
            },
        }
    );
};
