import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { groupApi } from "@entities/group";
import { queryClient } from "@app/providers";

export const useDeleteGroup = (courseId: string) => {
    const router = useRouter();
    return useMutation<null, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_GROUP, courseId],
        () => groupApi.deleteGroup(courseId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);
                router.push({ pathname: "/admin/groups" });
            },
        }
    );
};
