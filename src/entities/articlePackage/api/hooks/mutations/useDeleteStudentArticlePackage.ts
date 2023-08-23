import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteStudentArticlePackageRequest, DeleteStudentArticlePackageResponse, articlePackageApi } from "@entities/articlePackage";
import { queryClient } from "@app/providers";

interface UseDeleteStudentArticlePackageProps extends DeleteStudentArticlePackageRequest {
    name: string;
}

export const useDeleteStudentArticlePackage = ({ name, ...data }: UseDeleteStudentArticlePackageProps) => {
    return useMutation<DeleteStudentArticlePackageResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_STUDENT_ARTICLE_PACKAGE, data],
        () => articlePackageApi.deleteStudentArticlePackage(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_ARTICLE_PACKAGES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_ARTICLE_PACKAGES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление привязки пакетов статей к ученику",
                    message: `Пакет статей "${name}" успешно удален`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления привязки пакетов статей",
                });
            },
        }
    );
};
