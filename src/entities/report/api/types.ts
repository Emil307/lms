import { z } from "zod";
import { $getFiltersRequestType, $getFiltersRequestWithoutPaginationType, $Profile, $Role } from "@shared/types";
import { $User } from "@entities/user";
import { $AdminTransactionPaymentType, $AdminTransactionStatus } from "@entities/transaction";

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminTransactionableType = z.infer<typeof $AdminTransactionableType>;
export type AdminTransactionableTypeName = z.infer<typeof $AdminTransactionableTypeName>;
//student
export type AdminStudentReport = z.infer<typeof $AdminStudentReport>;
export type AdminStudentReportFromList = z.infer<typeof $AdminStudentReportFromList>;
//transaction
export type AdminTransactionReport = z.infer<typeof $AdminTransactionReport>;
export type AdminTransactionReportFromList = z.infer<typeof $AdminTransactionReportFromList>;

//FILTERS
export type AdminStudentReportsFiltersForm = z.infer<typeof $AdminStudentReportsFiltersForm>;
export type AdminTransactionReportsFiltersForm = z.infer<typeof $AdminTransactionReportsFiltersForm>;

//REQ/RESP
//student
export type GetAdminStudentReportsRequest = z.infer<typeof $GetAdminStudentReportsRequest>;
export type GetAdminStudentReportsResponse = z.infer<typeof $GetAdminStudentReportsResponse>;
export type AdminStudentReportsResponseMeta = z.infer<typeof $AdminStudentReportsResponseMeta>;
export type GetAdminStudentReportFiltersResponse = z.infer<typeof $GetAdminStudentReportFiltersResponse>;
export type GetAdminStudentReportEntitiesRequest = z.infer<typeof $GetAdminStudentReportEntitiesRequest>;
//transaction
export type GetAdminTransactionReportsRequest = z.infer<typeof $GetAdminTransactionReportsRequest>;
export type AdminTransactionReportsResponseMeta = z.infer<typeof $AdminTransactionReportsResponseMeta>;
export type GetAdminTransactionReportsResponse = z.infer<typeof $GetAdminTransactionReportsResponse>;
export type GetAdminTransactionReportFiltersResponse = z.infer<typeof $GetAdminTransactionReportFiltersResponse>;
export type GetAdminTransactionReportEntitiesRequest = z.infer<typeof $GetAdminTransactionReportEntitiesRequest>;

/**
 *
 * USER TYPES
 *
 */

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminTransactionableTypeName = z.literal("course").or(z.literal("articlePackage"));

export const $AdminTransactionableType = z.object({
    type: $AdminTransactionableTypeName,
    name: z.string(),
});

//STUDENT
export const $AdminStudentReport = z.object({
    amount: z.coerce.number(),
    user: $User
        .pick({
            id: true,
            email: true,
            roles: true,
        })
        .extend({
            profile: $Profile.pick({
                id: true,
                firstName: true,
                lastName: true,
                patronymic: true,
                description: true,
            }),
        }),
});

export const $AdminStudentReportFromList = $AdminStudentReport;

export const $AdminStudentReportsResponseMeta = z.object({
    studentsCount: z.number(),
    totalAmount: z.number(),
});

export const $GetAdminStudentReportsResponse = z.object({
    data: $AdminStudentReport.array(),
    meta: $AdminStudentReportsResponseMeta,
});

export const $AdminStudentReportsFiltersForm = z.object({
    transactionableType: z.string(),
    transactionableIds: z.string().array(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminStudentReportsRequest = z.object({
    filter: z
        .object({
            transactionableType: z.string(),
            transactionableIds: z.string().array(),
            createdAt: z.object({
                from: z.string(),
                to: z.string(),
            }),
        })
        .partial(),
});

export const $GetAdminStudentReportsRequest = $getFiltersRequestWithoutPaginationType($AdminStudentReportsRequest);

export const $GetAdminStudentReportFiltersResponse = z.object({
    transactionableTypes: $AdminTransactionableType.array(),
    roles: $Role.array(),
});

export const $AdminStudentReportEntitiesRequest = z.object({
    query: z.string().optional(),
    entityType: $AdminTransactionableTypeName,
    filter: z.object({}).partial(),
});

export const $GetAdminStudentReportEntitiesRequest = $getFiltersRequestType($AdminStudentReportEntitiesRequest);

//TRANSACTION

export const $AdminTransactionReport = z.object({
    paidAt: z.coerce.date(),
    paymentType: $AdminTransactionPaymentType,
    status: $AdminTransactionStatus,
    entity: z.object({
        type: $AdminTransactionableType,
        id: z.number(),
        name: z.string(),
    }),
    amount: z.number(),
    user: $User
        .pick({
            id: true,
            email: true,
        })
        .extend({
            profile: $Profile.pick({
                id: true,
                firstName: true,
                lastName: true,
                patronymic: true,
                description: true,
            }),
        }),
});

export const $AdminTransactionReportFromList = $AdminTransactionReport;

export const $AdminTransactionReportsResponseMeta = z.object({
    totalCount: z.number(),
    totalAmount: z.number(),
});

export const $GetAdminTransactionReportsResponse = z.object({
    data: $AdminTransactionReportFromList.array(),
    meta: $AdminTransactionReportsResponseMeta,
});

export const $AdminTransactionReportsFiltersForm = z.object({
    transactionableType: z.string(),
    transactionableIds: z.string().array(),
    roleId: z.string(),
    paymentTypes: z.string(),
    statuses: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminTransactionReportsRequest = z.object({
    filter: z
        .object({
            transactionableType: z.string(),
            transactionableIds: z.string().array(),
            paymentTypes: z.string().array(),
            statuses: z.string().array(),
            createdAt: z.object({
                from: z.string(),
                to: z.string(),
            }),
        })
        .partial(),
});

export const $GetAdminTransactionReportsRequest = $getFiltersRequestWithoutPaginationType($AdminTransactionReportsRequest);

export const $GetAdminTransactionReportFiltersResponse = z.object({
    transactionableTypes: $AdminTransactionableType.array(),
    paymentTypes: $AdminTransactionPaymentType.array(),
    statuses: $AdminTransactionStatus.array(),
});

export const $AdminTransactionReportEntitiesRequest = z.object({
    query: z.string().optional(),
    entityType: $AdminTransactionableTypeName,
    filter: z.object({}).partial(),
});

export const $GetAdminTransactionReportEntitiesRequest = $getFiltersRequestType($AdminTransactionReportEntitiesRequest);

/**
 *
 * USER ZOD
 *
 */
