import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminStudentReportFiltersResponse, reportApi } from "@entities/report";

export const useAdminStudentReportFilters = () => {
    return useQuery<GetAdminStudentReportFiltersResponse>([QueryKeys.GET_ADMIN_STUDENT_REPORT_FILTERS], () =>
        reportApi.getAdminStudentReportFilters()
    );
};
