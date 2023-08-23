import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { AttachArticlePackagesToStudentRequest, AttachArticlePackagesToStudentResponse, articlePackageApi } from "@entities/articlePackage";
import { queryClient } from "@app/providers";

export const useAttachArticlePackagesToStudent = ({ studentId }: Pick<AttachArticlePackagesToStudentRequest, "studentId">) => {
    return useMutation<
        AttachArticlePackagesToStudentResponse,
        AxiosError<FormErrorResponse>,
        Omit<AttachArticlePackagesToStudentRequest, "studentId">
    >(
        [MutationKeys.ATTACH_ARTICLE_PACKAGES_TO_STUDENT, studentId],
        (params) => articlePackageApi.attachArticlePackagesToStudent({ ...params, studentId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Пакеты базы знаний успешно привязаны к ученику",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_ARTICLE_PACKAGES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_ARTICLE_PACKAGES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка привязки пакетов базы знаний к ученику",
                });
            },
        }
    );
};
