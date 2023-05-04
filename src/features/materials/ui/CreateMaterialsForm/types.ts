import { z } from "zod";
import { $uploadedFile } from "@shared/ui";

export type CreateMaterialsFormValidationSchema = z.infer<typeof $createMaterialsFormValidationSchema>;

export type MaterialFile = z.infer<typeof $materialFile>;

export const $materialFile = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
});

export const $createMaterialsFormValidationSchema = z.object({
    materials: $uploadedFile.array().min(1, "Минимум 1 один файл"),
});
