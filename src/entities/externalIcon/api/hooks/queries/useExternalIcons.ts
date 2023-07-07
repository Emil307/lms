import { ExternalIconFromList, GetExternalIconsRequest, externalIconApi } from "@entities/externalIcon";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useExternalIcons = (data: GetExternalIconsRequest) => {
    return useInfiniteRequest<ExternalIconFromList>([QueryKeys.GET_EXTERNAL_ICONS, data], ({ pageParam = 1 }) =>
        externalIconApi.getExternalIcons({ ...data, page: pageParam }),
    );
};
