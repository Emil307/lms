import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteStudentArticlePackageRequest, DeleteStudentArticlePackageResponse, articlePackageApi } from "@entities/articlePackage";
import { queryClient } from "@app/providers";

interface UseDeleteStudentArticlePackageProps extends DeleteStudentArticlePackageRequest {
    name: string;
}

export const useDeleteStudentArticlePackage = ({
    name,
    ...data
}: UseDeleteStudentArticlePackageProps): UseMutationResult<DeleteStudentArticlePackageResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_STUDENT_ARTICLE_PACKAGE, data], () => articlePackageApi.deleteStudentArticlePackage(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление привязки пакетов статей к ученику",
                message: `Пакет статей "${name}" успешно удален`,
            });
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_ARTICLE_PACKAGES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_ARTICLE_PACKAGES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления привязки пакетов статей",
            });
        },
    });
};
