import { z } from "zod";

export type CreateCourseCollectionFormValidation = z.infer<typeof $CreateCourseCollectionFormValidation>;

export const $CreateCourseCollectionFormValidation = z.object({
    iconName: z.string({ required_error: "Выберите изображение подборки" }),
    name: z.string({ required_error: "Введите название подборки" }),
    description: z.string({ required_error: "Введите краткое описание" }).max(120, "Должно быть не более 120 символов"),
    isActive: z.boolean(),
});
