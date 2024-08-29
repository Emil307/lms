import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminTransactionReportFiltersResponse, reportApi } from "@entities/report";
import { FormErrorResponse } from "@shared/types";

export const useAdminTransactionReportFilters = (): UseQueryResult<
    GetAdminTransactionReportFiltersResponse,
    AxiosError<FormErrorResponse>
> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_FILTERS, [EntityNames.TRANSACTION, EntityNames.COURSE, EntityNames.ARTICLE_PACKAGE]],
        () => reportApi.getAdminTransactionReportFilters()
    );
};
