import { useQuery } from "@tanstack/react-query";
import { GetAdminTagRequest, tagApi } from "@entities/tag";
import { QueryKeys } from "@shared/constant";

export const useAdminTag = ({ id }: GetAdminTagRequest) => {
    return useQuery([QueryKeys.GET_ADMIN_TAG, id], () => tagApi.getAdminTag({ id }));
};
