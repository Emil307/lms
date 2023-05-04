import { z } from "zod";

export type BindingMaterialsFormValidationSchema = z.infer<typeof $bindingMaterialsFormValidationSchema>;

export const $bindingMaterialsFormValidationSchema = z.object({
    categoryIds: z.string().array().min(1, "Выберите категории"),
});
