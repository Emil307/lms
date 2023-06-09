import { useQuery } from "@tanstack/react-query";
import { GetAdminAuthorRequest, GetAdminAuthorResponse, authorApi } from "@entities/author";
import { QueryKeys } from "@shared/constant";

export const useAdminAuthor = ({ id }: GetAdminAuthorRequest) => {
    return useQuery<GetAdminAuthorResponse>([QueryKeys.GET_ADMIN_AUTHOR, id], () => authorApi.getAdminAuthor({ id }));
};
