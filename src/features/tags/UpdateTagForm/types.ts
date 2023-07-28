import { z } from "zod";

export type UpdateTagFormValidation = z.infer<typeof $UpdateTagFormValidation>;

export const $UpdateTagFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
});
