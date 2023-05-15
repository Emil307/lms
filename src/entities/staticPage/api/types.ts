import { z } from "zod";
import { $getPaginationResponseType, TDefaultRequestParams } from "@shared/types";

export type FaqItem = z.infer<typeof $FaqItem>;
export type Advantage = z.infer<typeof $Advantage>;

export type GetFaqResponse = z.infer<typeof $GetFaqResponse>;
export type GetContactsResponse = z.infer<typeof $GetContactsResponse>;
export type ContactUsRequest = z.infer<typeof $ContactUsRequest>;
export type GetAboutResponse = z.infer<typeof $GetAboutResponse>;
export type GetPublicOfferResponse = z.infer<typeof $GetPublicOfferResponse>;
export type GetMainBannerResponse = z.infer<typeof $GetMainBannerResponse>;
export type GetAdvantagesResponse = z.infer<typeof $GetAdvantagesResponse>;
export type CreateAdvantageRequest = z.infer<typeof $CreateAdvantageRequest>;
export type UpdateAdvantageRequest = z.infer<typeof $UpdateAdvantageRequest>;

export type GetAdvantagesRequest = TDefaultRequestParams;

export const $Advantage = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
});

export const $GetContactsResponse = z.object({
    title: z.string(),
    requisites: z.string(),
});

export const $GetAboutResponse = z.object({
    banner: z.object({
        name: z.string(),
        extension: z.string(),
        size: z.number(),
        absolutePath: z.string(),
    }),
    title: z.string(),
    shortContent: z.string(),
    fullContent: z.string(),
});

export const $GetPublicOfferResponse = z.object({
    content: z.string(),
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

export const $GetFaqResponse = $FaqItem.array();

export const $GetMainBannerResponse = z.object({
    title: z.string(),
    subTitle: z.string(),
    buttonText: z.string(),
    buttonLink: z.string(),
    authorActive: z.boolean(),
    authorFirstName: z.string(),
    authorLastName: z.string(),
    authorAbout: z.string(),
    authorShortQuote: z.string(),
    image: z.object({
        data: z.object({
            name: z.string(),
            extension: z.string(),
            size: z.number(),
            absolutePath: z.string(),
            id: z.number(),
            type: z.object({
                value: z.string(),
                name: z.string(),
            }),
            isActive: z.boolean(),
            createdAt: z.coerce.date(),
        }),
    }),
    authorImage: z.object({
        data: z.object({
            name: z.string(),
            extension: z.string(),
            size: z.number(),
            absolutePath: z.string(),
            id: z.number(),
            type: z.object({
                value: z.string(),
                name: z.string(),
            }),
            isActive: z.boolean(),
            createdAt: z.coerce.date(),
        }),
    }),
});

export const $GetAdvantagesResponse = $getPaginationResponseType($Advantage);

export const $CreateAdvantageRequest = z.object({
    title: z.string({ required_error: "Введите заголовок" }),
    description: z.string({ required_error: "Введите пояснение" }),
});

export const $UpdateAdvantageRequest = z.object({
    title: z.string({ required_error: "Введите заголовок" }),
    description: z.string({ required_error: "Введите пояснение" }),
});
