import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { CreateGroupRequest, GetAdminGroupResponse, groupApi } from "@entities/group";

export const useCreateGroup = () => {
    return useMutation<GetAdminGroupResponse, AxiosError<FormErrorResponse>, CreateGroupRequest>(
        [MutationKeys.CREATE_GROUP],
        (data: CreateGroupRequest) => groupApi.createGroup(data)
    );
};
