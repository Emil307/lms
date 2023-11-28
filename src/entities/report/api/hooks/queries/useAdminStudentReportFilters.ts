import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminStudentReportFiltersResponse, reportApi } from "@entities/report";
import { FormErrorResponse } from "@shared/types";

export const useAdminStudentReportFilters = (): UseQueryResult<GetAdminStudentReportFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_STUDENT_REPORT_FILTERS,
            [EntityNames.STUDENT_REPORT, EntityNames.STUDENT, EntityNames.COURSE, EntityNames.COURSE_PACKAGE, EntityNames.ARTICLE_PACKAGE],
        ],
        () => reportApi.getAdminStudentReportFilters()
    );
};
