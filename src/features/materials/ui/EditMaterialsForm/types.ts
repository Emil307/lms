import { z } from "zod";

export type MaterialFile = z.infer<typeof $materialFile>;
export type UpdateMaterialsFormValidationSchema = z.infer<typeof $updateMaterialsFormValidationSchema>;

export const $materialFile = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
});

export const $updateMaterialsFormValidationSchema = z.object({
    files: $materialFile.array(),
    isBinding: z.boolean(),
});
