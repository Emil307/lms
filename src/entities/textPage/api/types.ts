import { z } from "zod";

export const $getContactsResponse = z.object({
    title: z.string(),
    requisites: z.string(),
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

export type GetContactsResponse = z.infer<typeof $getContactsResponse>;
export type ContactUsRequest = z.infer<typeof $contactUsRequest>;
