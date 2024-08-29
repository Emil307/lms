import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { useInfiniteRequest } from "@shared/utils";
import { GetAdminTransactionReportEntitiesRequest } from "@entities/report";
import { AdminArticlePackageFromList, articlePackageApi } from "@entities/articlePackage";

export const useAdminTransactionReportEntities = ({ entityType, ...data }: Omit<GetAdminTransactionReportEntitiesRequest, "page">) => {
    return useInfiniteRequest<AdminCourseFromList | AdminArticlePackageFromList>(
        [
            QueryKeys.GET_ADMIN_TRANSACTION_REPORT_ENTITIES,
            [
                EntityNames.STUDENT_REPORT,
                EntityNames.COURSE,
                EntityNames.ARTICLE_PACKAGE,
                EntityNames.CATEGORY,
                EntityNames.TAG,
                EntityNames.USER,
            ],
            entityType,
            data,
        ],

        ({ pageParam = 1 }) => {
            switch (entityType) {
                case "course":
                    return courseApi.getAdminCourses({ ...data, page: pageParam });
                case "articlePackage":
                    return articlePackageApi.getAdminArticlePackages({ ...data, page: pageParam });

                default:
                    return courseApi.getAdminCourses({ ...data, page: pageParam });
            }
        },
        {
            enabled: !!entityType,
        }
    );
};
