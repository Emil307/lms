import { z } from "zod";
import { $getPaginationResponseType, TDefaultRequestParams } from "@shared/types";

export type FaqItem = z.infer<typeof $faqItem>;
export type Advantage = z.infer<typeof $advantage>;

export type GetFaqResponse = z.infer<typeof $getFaqResponse>;
export type GetContactsResponse = z.infer<typeof $getContactsResponse>;
export type ContactUsRequest = z.infer<typeof $contactUsRequest>;
export type GetAboutResponse = z.infer<typeof $getAboutResponse>;
export type GetPublicOfferResponse = z.infer<typeof $getPublicOfferResponse>;
export type GetMainBannerResponse = z.infer<typeof $getMainBannerResponse>;
export type GetAdvantagesResponse = z.infer<typeof $getAdvantagesResponse>;
export type CreateAdvantageRequest = z.infer<typeof $createAdvantageRequest>;
export type UpdateAdvantageRequest = z.infer<typeof $updateAdvantageRequest>;

export type GetAdvantagesRequest = TDefaultRequestParams;

export const $advantage = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
});

export const $getContactsResponse = z.object({
    title: z.string(),
    requisites: z.string(),
});

export const $getAboutResponse = z.object({
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

export const $getPublicOfferResponse = z.object({
    content: z.string(),
});

export const $contactUsRequest = z.object({
    username: z.string({ required_error: "Введите имя" }),
    phoneNumber: z.string({ required_error: "Введите номер телефона" }).refine((value) => /^(\+?7|8)?9\d{9}$/.test(value), {
        message: "Некорректный формат",
    }),
    email: z.string({ required_error: "Введите email" }).email(),
    description: z.string(),
    isAgree: z.boolean(),
});

export const $faqItem = z.object({
    question: z.string(),
    answer: z.string(),
});

export const $getFaqResponse = z.object({ data: z.array($faqItem) });

export const $getMainBannerResponse = z.object({
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

export const $getAdvantagesResponse = $getPaginationResponseType($advantage);

export const $createAdvantageRequest = z.object({
    title: z.string({ required_error: "Введите заголовок" }),
    description: z.string({ required_error: "Введите пояснение" }),
});

export const $updateAdvantageRequest = z.object({
    title: z.string({ required_error: "Введите заголовок" }),
    description: z.string({ required_error: "Введите пояснение" }),
});
