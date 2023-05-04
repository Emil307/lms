import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Author, GetAuthorsResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useUpdateActivityAuthor = (id: string) => {
    //TODO: Поправить как обновят беки что при обвлении всегда возвращается модель
    return useMutation<{ status: boolean }, AxiosError<FormErrorResponse>, boolean, unknown>(
        [MutationKeys.UPDATE_ACTIVITY_AUTHOR, id],
        (status: boolean) => authorApi.updateActivityAuthor({ id, status }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_AUTHOR, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_AUTHORS] });

                const previousAuthorData = queryClient.getQueryData<Author>([QueryKeys.GET_AUTHOR, id]);
                const previousAuthorsData = queryClient.getQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS]);

                queryClient.setQueryData<Author>(
                    [QueryKeys.GET_AUTHOR, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((author) =>
                            String(author.id) === id ? { ...author, isActive: updatedStatus } : author
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
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_AUTHORS]);
            },
        }
    );
};
