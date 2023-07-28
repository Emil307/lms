import { z } from "zod";

export type CreateTagFormValidation = z.infer<typeof $CreateTagFormValidation>;

export const $CreateTagFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
});
