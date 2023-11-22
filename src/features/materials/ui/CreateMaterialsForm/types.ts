import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type CreateMaterialsFormValidation = z.infer<typeof $CreateMaterialsFormValidation>;

export const $CreateMaterialsFormValidation = z.object({
    files: $UploadedFile.array().min(1, "Минимум 1 файл").max(10, "Максимум 10 файлов"),
});
