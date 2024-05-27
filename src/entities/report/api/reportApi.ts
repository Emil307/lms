import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $GetAdminStudentReportFiltersResponse,
    $GetAdminStudentReportsResponse,
    $GetAdminTransactionReportFiltersResponse,
    $GetAdminTransactionReportsResponse,
    GetAdminStudentReportFiltersResponse,
    GetAdminStudentReportsRequest,
    GetAdminStudentReportsResponse,
    GetAdminTransactionReportFiltersResponse,
    GetAdminTransactionReportsRequest,
    GetAdminTransactionReportsResponse,
} from "./types";

class ReportApi extends BaseApi {
    //ADMIN
    //student
    async getAdminStudentReports(data: GetAdminStudentReportsRequest): Promise<GetAdminStudentReportsResponse> {
        const response = await this.instance.post("core/admin/report-students", data);
        return $GetAdminStudentReportsResponse.parse(response);
    }
    async getAdminStudentReportFilters(): Promise<GetAdminStudentReportFiltersResponse> {
        const response = await this.instance.get("core/admin/report-students/filters");
        return $GetAdminStudentReportFiltersResponse.parse(response);
    }

    //transaction
    async getAdminTransactionReports(data: GetAdminTransactionReportsRequest): Promise<GetAdminTransactionReportsResponse> {
        const response = await this.instance.post("core/admin/report-transactions", data);
        return $GetAdminTransactionReportsResponse.parse(response);
    }
    async getAdminTransactionReportFilters(): Promise<GetAdminTransactionReportFiltersResponse> {
        const response = await this.instance.get("core/admin/report-transactions/filters");
        return $GetAdminTransactionReportFiltersResponse.parse(response);
    }

    //USER
}

export const reportApi = new ReportApi(axios);
