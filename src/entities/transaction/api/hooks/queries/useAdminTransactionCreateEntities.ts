import { GetAdminTransactionCreateEntitiesRequest } from "@entities/transaction";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { useInfiniteRequest } from "@shared/utils";
import { AdminCoursePackage, coursePackageApi } from "@entities/coursePackage";

export const useAdminTransactionCreateEntities = ({ entityType, ...data }: Omit<GetAdminTransactionCreateEntitiesRequest, "page">) => {
    return useInfiniteRequest<AdminCourseFromList | AdminCoursePackage>(
        [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_ENTITIES, entityType, data],
        ({ pageParam = 1 }) => {
            switch (entityType) {
                //TODO: Дополнить как появятся новые типы сущностей
                case "course":
                    return courseApi.getAdminCourses({ ...data, page: pageParam });
                case "course package":
                    return coursePackageApi.getAdminCoursePackages({ ...data, page: pageParam });

                default:
                    return courseApi.getAdminCourses({ ...data, page: pageParam });
            }
        },
        {
            enabled: !!entityType,
        },
    );
};
