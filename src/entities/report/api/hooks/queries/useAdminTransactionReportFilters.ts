import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminTransactionReportFiltersResponse, reportApi } from "@entities/report";

export const useAdminTransactionReportFilters = () => {
    return useQuery<GetAdminTransactionReportFiltersResponse>([QueryKeys.GET_ADMIN_TRANSACTION_REPORT_FILTERS], () =>
        reportApi.getAdminTransactionReportFilters()
    );
};
