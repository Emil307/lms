import { useQuery } from "@tanstack/react-query";
import { tagApi } from "@entities/tag";
import { QueryKeys } from "@shared/constant";

export const useAdminTag = (tagId: string) => {
    return useQuery([QueryKeys.GET_ADMIN_TAG, tagId], () => tagApi.getAdminTag(tagId));
};
