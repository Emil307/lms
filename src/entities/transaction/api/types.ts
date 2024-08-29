import { z } from "zod";
import { $User } from "@entities/user";
import { $Profile, $getDateObjectType, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminTransaction = z.infer<typeof $AdminTransaction>;
export type AdminTransactionFromList = z.infer<typeof $AdminTransactionFromList>;
export type AdminTransactionEntity = z.infer<typeof $AdminTransactionEntity>;
export type AdminTransactionEntityType = z.infer<typeof $AdminTransactionEntityType>;
export type TransactionEntityTypeName = z.infer<typeof $TransactionEntityTypeName>;
export type AdminTransactionPaymentType = z.infer<typeof $AdminTransactionPaymentType>;
export type AdminTransactionStatus = z.infer<typeof $AdminTransactionStatus>;

//FILTERS
export type AdminTransactionsFiltersForm = z.infer<typeof $AdminTransactionsFiltersForm>;

//REQ/RESP
export type GetAdminTransactionsRequest = z.infer<typeof $GetAdminTransactionsRequest>;
export type GetAdminTransactionsResponse = z.infer<typeof $GetAdminTransactionsResponse>;
export type GetAdminTransactionsFiltersResponse = z.infer<typeof $GetAdminTransactionsFiltersResponse>;
export type GetAdminTransactionRequest = z.infer<typeof $GetAdminTransactionRequest>;
export type GetAdminTransactionResponse = z.infer<typeof $GetAdminTransactionResponse>;
export type GetAdminTransactionsCreateResourcesResponse = z.infer<typeof $GetAdminTransactionsCreateResourcesResponse>;
export type CreateAdminTransactionRequest = z.infer<typeof $CreateAdminTransactionRequest>;
export type CreateAdminTransactionResponse = z.infer<typeof $CreateAdminTransactionResponse>;
export type UpdateAdminTransactionRequest = z.infer<typeof $UpdateAdminTransactionRequest>;
export type UpdateAdminTransactionResponse = z.infer<typeof $UpdateAdminTransactionResponse>;
export type DeleteAdminTransactionRequest = z.infer<typeof $DeleteAdminTransactionRequest>;
export type DeleteAdminTransactionResponse = z.infer<typeof $DeleteAdminTransactionResponse>;
export type GetAdminTransactionCreateEntitiesRequest = z.infer<typeof $GetAdminTransactionCreateEntitiesRequest>;

/**
 *
 * USER TYPES
 *
 */
export type Transaction = z.infer<typeof $Transaction>;
export type TransactionFromList = z.infer<typeof $TransactionFromList>;
export type TransactionEntity = z.infer<typeof $TransactionEntity>;
export type TransactionEntityType = z.infer<typeof $TransactionEntityType>;
export type TransactionPaymentType = z.infer<typeof $TransactionPaymentType>;
export type TransactionStatus = z.infer<typeof $TransactionStatus>;

//FILTERS
export type TransactionsFiltersForm = z.infer<typeof $TransactionsFiltersForm>;

//REQ/RESP
export type GetTransactionsRequest = z.infer<typeof $GetTransactionsRequest>;
export type GetTransactionsResponse = z.infer<typeof $GetTransactionsResponse>;
export type GetTransactionsFiltersResponse = z.infer<typeof $GetTransactionsFiltersResponse>;
export type CreateFreeTransactionRequest = z.infer<typeof $CreateFreeTransactionRequest>;

export const $TransactionEntityTypeName = z.literal("course").or(z.literal("articlePackage"));

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminTransactionEntityType = z.object({
    type: $TransactionEntityTypeName,
    name: z.string(),
});
export const $AdminTransactionPaymentType = z.object({
    type: z.literal("online").or(z.literal("bill")).or(z.literal("cash")),
    name: z.string(),
});
export const $AdminTransactionStatus = z.object({
    status: z.literal("new").or(z.literal("cancelled")).or(z.literal("paid")),
    name: z.string(),
});

export const $AdminTransactionEntity = z.object({
    id: z.number(),
    type: $AdminTransactionEntityType,
    name: z.string(),
});

export const $AdminTransaction = z.object({
    id: z.number(),
    entity: $AdminTransactionEntity,
    createdAt: z.coerce.date(),
    paymentType: $AdminTransactionPaymentType,
    amount: z.number(),
    status: $AdminTransactionStatus,
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

export const $AdminTransactionFromList = $AdminTransaction;

export const $GetAdminTransactionsResponse = $getPaginationResponseType($AdminTransactionFromList);

export const $GetAdminTransactionsFiltersResponse = z.object({
    entityTypes: $AdminTransactionEntityType.array(),
    paymentTypes: $AdminTransactionPaymentType.array(),
    statuses: $AdminTransactionStatus.array(),
});

export const $AdminTransactionsFiltersForm = z.object({
    query: z.string(),
    entityType: z.string(),
    paymentType: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    status: z.string(),
});

export const $AdminTransactionsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            "entity.type": z.string(),
            paymentType: z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            status: z.string(),
        })
        .partial(),
});

export const $GetAdminTransactionsRequest = $getFiltersRequestType($AdminTransactionsRequest);

export const $GetAdminTransactionRequest = z.object({
    id: z.string(),
});

export const $GetAdminTransactionResponse = $AdminTransaction;

export const $GetAdminTransactionsCreateResourcesResponse = z.object({
    entityTypes: $AdminTransactionEntityType.array(),
    paymentTypes: $AdminTransactionPaymentType.array(),
    statuses: $AdminTransactionStatus.array(),
    users: $User
        .pick({
            id: true,
        })
        .extend({
            profile: $Profile.pick({
                firstName: true,
                lastName: true,
                patronymic: true,
            }),
        })
        .array(),
});

export const $CreateAdminTransactionRequest = z.object({
    entityType: z.string(),
    entityId: z.number(),
    amount: z.number(),
    userId: z.number(),
    status: z.string(),
    paymentType: z.string(),
});

export const $CreateAdminTransactionResponse = $AdminTransaction;

export const $UpdateAdminTransactionRequest = $CreateAdminTransactionRequest.extend({
    id: z.string(),
});

export const $UpdateAdminTransactionResponse = $AdminTransaction;

export const $DeleteAdminTransactionRequest = z.object({
    id: z.string(),
});

export const $DeleteAdminTransactionResponse = z.null();

export const $GetAdminTransactionCreateEntities = z.object({
    entityType: $AdminTransactionEntityType,
});

export const $AdminTransactionCreateEntitiesRequest = z.object({
    query: z.string().optional(),
    entityType: $TransactionEntityTypeName,
    filter: z.object({}).partial(),
});

export const $GetAdminTransactionCreateEntitiesRequest = $getFiltersRequestType($AdminTransactionCreateEntitiesRequest);

/**
 *
 * USER ZOD
 *
 */

//TODO:
export const $TransactionEntityType = $AdminTransactionEntityType;
export const $TransactionPaymentType = $AdminTransactionPaymentType;
export const $TransactionStatus = $AdminTransactionStatus;
export const $TransactionEntity = z.object({
    id: z.number(),
    type: $TransactionEntityType,
    name: z.string(),
});

export const $Transaction = z.object({
    id: z.number(),
    entity: $TransactionEntity,
    createdAt: z.coerce.date(),
    paymentType: $TransactionPaymentType,
    amount: z.number(),
    status: $TransactionStatus,
});

export const $TransactionFromList = $Transaction;

export const $GetTransactionsResponse = $getPaginationResponseType($TransactionFromList);

export const $TransactionsFiltersForm = z.object({
    query: z.string(),
    entityType: z.string(),
    paymentType: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    status: z.string(),
});

export const $TransactionsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            "entity.type": z.string(),
            paymentType: z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            status: z.string(),
        })
        .partial(),
});

export const $GetTransactionsRequest = $getFiltersRequestType($TransactionsRequest);

export const $GetTransactionsFiltersResponse = z.object({
    entityTypes: $TransactionEntityType.array(),
    paymentTypes: $TransactionPaymentType.array(),
    statuses: $TransactionStatus.array(),
});

export const $CreateFreeTransactionRequest = z.object({
    entityType: $TransactionEntityTypeName,
    entityId: z.number(),
});
