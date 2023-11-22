import { z } from "zod";
import { $MaterialFile } from "@features/materials/helpers";

export type UpdateMaterialsFormValidation = z.infer<typeof $UpdateMaterialsFormValidation>;

export const $UpdateMaterialsFormValidation = z.object({
    materials: z.array($MaterialFile),
    isBinding: z.boolean(),
    categoryIds: z.array(z.string()),
});
