import { z } from "zod";
import { $Profile, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";
import { $User } from "@entities/user";

export type LastSupportMessage = z.infer<typeof $LastSupportMessage>;
export type AdminSupportConversation = z.infer<typeof $AdminSupportConversation>;
export type AdminSupportConversationFromList = z.infer<typeof $AdminSupportConversationFromList>;
export type AdminSupportMessage = z.infer<typeof $AdminSupportMessage>;
export type AdminSupportMessageFromList = z.infer<typeof $AdminSupportMessageFromList>;

//FILTERS
export type AdminSupportConversationFiltersForm = z.infer<typeof $AdminSupportConversationFiltersForm>;

//REQ/RESP
export type GetAdminSupportConversationsRequest = z.infer<typeof $GetAdminSupportConversationsRequest>;
export type GetAdminSupportConversationResponse = z.infer<typeof $GetAdminSupportConversationResponse>;
export type GetAdminSupportMessagesRequest = z.infer<typeof $GetAdminSupportMessagesRequest>;
export type GetAdminSupportMessagesResponse = z.infer<typeof $GetAdminSupportMessagesResponse>;
export type CreateAdminSupportMessageRequest = z.infer<typeof $CreateAdminSupportMessageRequest>;
export type CreateAdminSupportMessageResponse = z.infer<typeof $CreateAdminSupportMessageResponse>;
//users
export type CreateSupportMessageRequest = z.infer<typeof $CreateSupportMessageRequest>;
export type CreateSupportMessageResponse = z.infer<typeof $CreateSupportMessageResponse>;

export const $LastSupportMessage = z.object({
    id: z.number(),
    message: z.string(),
    createdAt: z.coerce.date(),
});

export const $AdminSupportConversation = z.object({
    id: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    hasSupportMessage: z.boolean(),
    profile: $Profile.pick({ firstName: true, lastName: true, patronymic: true, avatar: true }),
    lastSupportMessage: $LastSupportMessage,
    supportConversation: z.object({
        id: z.number(),
    }),
});

export const $AdminSupportConversationFromList = $AdminSupportConversation;

export const $GetAdminSupportConversationResponse = $getPaginationResponseType($AdminSupportConversationFromList);

export const $AdminSupportConversationsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            id: z.number(),
        })
        .partial()
        .optional(),
});

export const $GetAdminSupportConversationsRequest = $getFiltersRequestType($AdminSupportConversationsRequest);

export const $AdminSupportMessage = z.object({
    id: z.number(),
    message: z.string(),
    createdAt: z.coerce.date(),
    user: $User.pick({
        id: true,
        email: true,
        profile: true,
    }),
});

export const $AdminSupportMessageFromList = $AdminSupportMessage;

export const $GetAdminSupportMessagesResponse = $getPaginationResponseType($AdminSupportMessageFromList);

export const $AdminSupportMessagesRequest = z.object({
    conversationId: z.number().optional(),
});

export const $GetAdminSupportMessagesRequest = $getFiltersRequestType($AdminSupportMessagesRequest);

export const $CreateAdminSupportMessageRequest = z.object({
    conversationId: z.number(),
    message: z.string(),
});

export const $CreateAdminSupportMessageResponse = $AdminSupportMessage;

export const $AdminSupportConversationFiltersForm = z.object({
    query: z.string().optional(),
    userId: z.number().nullable().optional(),
});

//USER

export const $CreateSupportMessageRequest = z.object({
    message: z.string(),
});

export const $CreateSupportMessageResponse = $AdminSupportMessage;
