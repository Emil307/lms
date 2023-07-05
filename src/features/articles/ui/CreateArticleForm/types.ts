import { z } from "zod";

export type CreateArticleFormValidation = z.infer<typeof $CreateArticleFormValidation>;

export const $CreateArticleFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
    content: z.string({ required_error: "Введите контент" }),
    isActive: z.boolean(),
    categoryId: z.string({ required_error: "Выберите категорию" }),
    subcategories: z.string().array(),
    tags: z.array(z.string()).optional(),
});
