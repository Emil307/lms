import { z } from "zod";

export type BindingMaterialsFormValidation = z.infer<typeof $BindingMaterialsFormValidation>;

export const $BindingMaterialsFormValidation = z.object({
    categoryIds: z.string().array().min(1, "Выберите категории"),
});
