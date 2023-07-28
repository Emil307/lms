import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type CreateMaterialsFormValidation = z.infer<typeof $CreateMaterialsFormValidation>;

export const $CreateMaterialsFormValidation = z.object({
    materials: $UploadedFile.array().min(1, "Минимум 1 один файл"),
});
