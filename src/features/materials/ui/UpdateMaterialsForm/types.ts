import { z } from "zod";

export type UpdateMaterialsFormValidation = z.infer<typeof $UpdateMaterialsFormValidation>;
export type MaterialFile = z.infer<typeof $MaterialFile>;

export const $MaterialFile = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
});

export const $UpdateMaterialsFormValidation = z.object({
    files: $MaterialFile.array(),
    isBinding: z.boolean(),
});
