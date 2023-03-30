import { z } from "zod";

export type GetContactsResponse = z.infer<typeof $getContactsResponse>;
export type ContactUsRequest = z.infer<typeof $contactUsRequest>;
export type GetAboutResponse = z.infer<typeof $getAboutResponse>;
export type GetPublicOfferResponse = z.infer<typeof $getPublicOfferResponse>;

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
