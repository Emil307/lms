import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminCourseFromList, courseApi } from "@entities/course";
import { useInfiniteRequest } from "@shared/utils";
import { GetAdminTransactionReportEntitiesRequest } from "@entities/report";
import { AdminCoursePackageFromList, coursePackageApi } from "@entities/coursePackage";
import { AdminArticlePackageFromList, articlePackageApi } from "@entities/articlePackage";

export const useAdminTransactionReportEntities = ({ entityType, ...data }: Omit<GetAdminTransactionReportEntitiesRequest, "page">) => {
    return useInfiniteRequest<AdminCourseFromList | AdminCoursePackageFromList | AdminArticlePackageFromList>(
        [
            QueryKeys.GET_ADMIN_TRANSACTION_REPORT_ENTITIES,
            [
                EntityNames.STUDENT_REPORT,
                EntityNames.COURSE,
                EntityNames.COURSE_PACKAGE,
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
                case "course_package":
                    return coursePackageApi.getAdminCoursePackages({ ...data, page: pageParam });
                case "article_package":
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
