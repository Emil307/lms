import { z } from "zod";
import { $LastUpdated, $UploadedFile, $getFiltersRequestType, $getPaginationResponseType, TDefaultRequestParams } from "@shared/types";
import { REGEXP_TEXTEDITOR_INNER_TEXT } from "@shared/constant";

/**
 *
 * ADMIN TYPES
 *
 */

/**
 *
 * USER TYPES
 *
 */

export type FaqItem = z.infer<typeof $FaqItem>;
export type AdminFaqItem = z.infer<typeof $AdminFaqItem>;
export type Advantage = z.infer<typeof $Advantage>;

export type GetFaqRequest = z.infer<typeof $GetFaqRequest>;
export type GetFaqResponse = z.infer<typeof $GetFaqResponse>;
export type GetAdminFaqResponse = z.infer<typeof $GetAdminFaqResponse>;
export type GetContactsResponse = z.infer<typeof $GetContactsResponse>;
export type ContactUsRequest = z.infer<typeof $ContactUsRequest>;
export type GetAboutResponse = z.infer<typeof $GetAboutResponse>;
export type GetPublicOfferResponse = z.infer<typeof $GetPublicOfferResponse>;
export type GetMainBannerResponse = z.infer<typeof $GetMainBannerResponse>;
export type GetAdvantagesResponse = z.infer<typeof $GetAdvantagesResponse>;
export type CreateAdvantageRequest = z.infer<typeof $CreateAdvantageRequest>;
export type UpdateAdvantageRequest = z.infer<typeof $UpdateAdvantageRequest>;
export type UpdateMainBannerRequest = z.infer<typeof $UpdateMainBannerRequest>;

export type UpdateAboutRequest = z.infer<typeof $UpdateAboutRequest>;
export type UpdateContactsRequest = z.infer<typeof $UpdateContactsRequest>;
export type UpdatePublicOfferRequest = z.infer<typeof $UpdatePublicOfferRequest>;
export type CreateFaqRequest = z.infer<typeof $CreateFaqRequest>;
export type UpdateFaqRequest = z.infer<typeof $UpdateFaqRequest>;
export type UpdateFaqOrderRequest = z.infer<typeof $UpdateFaqOrderRequest>;
export type UpdateFaqActivityStatusRequest = z.infer<typeof $UpdateFaqActivityStatusRequest>;
export type UpdateFaqActivityStatusResponse = z.infer<typeof $UpdateFaqActivityStatusResponse>;
export type GetAdminAdvantagesResponse = z.infer<typeof $GetAdminAdvantagesResponse>;
export type GetAdminAdvantagesResponseMeta = z.infer<typeof $GetAdminAdvantagesResponseMeta>;

export type GetAdvantagesRequest = TDefaultRequestParams;

/**
 *
 * ADMIN ZOD
 *
 */

/**
 *
 * USER ZOD
 *
 */

export const $Advantage = z.object({
    id: z.number(),
    icon: $UploadedFile.nullable().optional(),
    iconId: z.number().nullable().optional(),
    title: z.string(),
    description: z.string(),
});

export const $GetContactsResponse = z.object({
    title: z.string(),
    requisites: z.string(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $GetAboutResponse = z.object({
    title: z.string().nullable(),
    shortContent: z.string().nullable(),
    fullContent: z.string().nullable(),
    banner: z
        .object({
            id: z.number(),
            name: z.string(),
            extension: z.string(),
            size: z.number(),
            absolutePath: z.string(),
            //Для роли админа больше полей
            type: z
                .object({
                    value: z.string(),
                    name: z.string(),
                })
                .nullable()
                .optional(),
            isActive: z.boolean().optional(),
            createdAt: z.coerce.date().optional(),
        })
        .nullable(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $GetPublicOfferResponse = z.object({
    content: z.string(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $ContactUsRequest = z.object({
    username: z.string({ required_error: "Введите имя" }),
    phoneNumber: z.string({ required_error: "Введите номер телефона" }).refine((value) => /^(\+?7|8)?9\d{9}$/.test(value), {
        message: "Некорректный формат",
    }),
    email: z.string({ required_error: "Введите email" }).email(),
    description: z.string(),
    isAgree: z.boolean(),
});

export const $FaqItem = z.object({
    id: z.number(),
    question: z.string(),
    answer: z.string(),
});

export const $AdminFaqItem = $FaqItem.extend({
    isActive: z.boolean(),
    isStatic: z.boolean(),
});

export const $FaqRequest = z.object({
    paginate: z.boolean(),
    filter: z
        .object({
            isStatic: z.boolean(),
        })
        .partial(),
});

export const $GetFaqRequest = $getFiltersRequestType($FaqRequest).partial();

export const $GetFaqResponse = $FaqItem.array();

export const $GetAdminFaqResponse = z.object({
    data: $AdminFaqItem.array(),
    meta: z.object({
        lastUpdated: $LastUpdated.nullable(),
    }),
});

export const $GetMainBannerResponse = z.object({
    title: z.string(),
    image: $UploadedFile.nullable(),
    subTitle: z.string(),
    buttonText: z.string(),
    buttonLink: z.string(),
    authorActive: z.boolean(),
    authorImage: $UploadedFile.nullable(),
    authorFirstName: z.string().nullable(),
    authorLastName: z.string().nullable(),
    authorAbout: z.string().nullable(),
    authorShortQuote: z.string().nullable(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $GetAdvantagesResponse = $getPaginationResponseType($Advantage);

export const $GetAdminAdvantagesResponseMeta = z.object({
    lastUpdated: $LastUpdated.nullable(),
});

export const $GetAdminAdvantagesResponse = $getPaginationResponseType($Advantage).merge(
    z.object({
        meta: $GetAdminAdvantagesResponseMeta,
    })
);

export const $CreateAdvantageRequest = z.object({
    icon: $UploadedFile.nullable(),
    iconId: z.number().nullable(),
    title: z.string({ required_error: "Введите заголовок" }),
    description: z.string({ required_error: "Введите пояснение" }),
});

export const $UpdateAdvantageRequest = z.object({
    icon: $UploadedFile.nullable(),
    iconId: z.number().nullable(),
    title: z.string({ required_error: "Введите заголовок" }),
    description: z.string({ required_error: "Введите пояснение" }),
});

export const $UpdateMainBannerRequest = z.object({
    indexBannerImage: z.number().optional(),
    indexBannerTitle: z.string(),
    indexBannerSubTitle: z.string(),
    indexBannerButtonText: z.string(),
    indexBannerButtonLink: z.string(),
    indexBannerAuthorActive: z.boolean(),
    indexBannerAuthorImage: z.number().nullish(),
    indexBannerAuthorFirstName: z.string().optional(),
    indexBannerAuthorLastName: z.string().optional(),
    indexBannerAuthorAbout: z.string().optional(),
    indexBannerAuthorShortQuote: z.string().optional(),
});

//TODO: refactoring !!!!!

export const $UpdateAboutRequest = z.object({
    aboutPageBannerImage: z.number().optional(),
    aboutPageTitle: z.string(),
    aboutPageShortContent: z.string(),
    aboutPageFullContent: z.string(),
});

export const $UpdateContactsRequest = z.object({
    contactPageTitle: z.string({ required_error: "Введите заголовок" }),
    contactPageRequisites: z.string({ required_error: "Введите реквизиты" }),
});

export const $UpdatePublicOfferRequest = z.object({
    publicOfferContent: z
        .string({ required_error: "Введите описание" })
        .refine((value) => value.replace(REGEXP_TEXTEDITOR_INNER_TEXT, "").length, {
            message: "Введите описание",
        }),
});

export const $CreateFaqRequest = z.object({
    question: z.string({ required_error: "Введите вопрос" }),
    answer: z.string({ required_error: "Введите ответ" }),
    isActive: z.boolean(),
    isStatic: z.boolean(),
});

export const $UpdateFaqRequest = $CreateFaqRequest.extend({
    id: z.number().optional(),
});

export const $UpdateFaqOrderRequest = z.object({
    after: z.number(),
    id: z.number(),
});

export const $UpdateFaqActivityStatusRequest = z.object({
    id: z.number(),
    isActive: z.boolean(),
});

export const $UpdateFaqActivityStatusResponse = z.object({
    isActive: z.boolean(),
});
