import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { GetAdminGroupResponse, groupApi, UpdateGroupRequest } from "@entities/group";

export const useUpdateGroup = () => {
    return useMutation<GetAdminGroupResponse, AxiosError<FormErrorResponse>, UpdateGroupRequest>(
        [MutationKeys.UPDATE_GROUP],
        (data: UpdateGroupRequest) => groupApi.updateGroup(data)
    );
};
