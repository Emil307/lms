import { z } from "zod";

export type CreateGroupFormValidation = z.infer<typeof $CreateGroupFormValidation>;

export const $CreateGroupFormValidation = z.object({
    courseId: z.string({ required_error: "Выберите курс" }),
    teacherId: z.string().optional(),
    name: z.string({ required_error: "Введите название группы" }),
    maxStudentsCount: z
        .number({ required_error: "Укажите количество учеников" })
        .positive("Число должно быть положительным")
        .int("Число должно быть целым")
        .nullable()
        .refine((value) => value !== null, {
            message: "Укажите количество учеников",
        }),
    isActive: z.boolean(),
    educationStartDate: z.coerce
        .date({ required_error: "Выберите период" })
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
    educationFinishDate: z.coerce
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
});
