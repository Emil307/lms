import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateCourseCollectionFormValidation = z.infer<typeof $UpdateCourseCollectionFormValidation>;

export const $UpdateCourseCollectionFormValidation = z.object({
    cover: $UploadedFile.nullable(),
    name: z.string({ required_error: "Введите название подборки" }),
    description: z.string({ required_error: "Введите краткое описание" }).max(120, "Должно быть не более 120 символов"),
    isActive: z.boolean(),
});
