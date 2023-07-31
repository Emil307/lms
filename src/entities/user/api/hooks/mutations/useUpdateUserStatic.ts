import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { UpdateUserStaticResponse, userApi } from "@entities/user";
import { TUser } from "@entities/user";

interface Params {
    id: string;
    fio: string;
}

export const useUpdateUserStatic = ({
    id,
    fio,
}: Params): UseMutationResult<UpdateUserStaticResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation([MutationKeys.UPDATE_USER_STATIC, id], (isStatic: boolean) => userApi.updateUserStatic({ id, isStatic }), {
        onMutate: async (updatedStatic) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_USER, id] });

            const previousUserData = queryClient.getQueryData<TUser>([QueryKeys.GET_ADMIN_USER, id]);

            queryClient.setQueryData<TUser>(
                [QueryKeys.GET_ADMIN_USER, id],
                (previousData) => previousData && { ...previousData, isStatic: updatedStatic }
            );

            return { previousUserData };
        },
        onError: (err, _, context) => {
            if (context?.previousUserData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_USER, id], context.previousUserData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSuccess: ({ isStatic }) => {
            queryClient.invalidateQueries([QueryKeys.GET_STATIC_USERS]);

            const statusMessage = isStatic ? "добавлен для отображения на главной странице" : "удален из отображаемых на главной странице";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Пользователь "${fio}" ${statusMessage}.`,
            });
        },
    });
};
