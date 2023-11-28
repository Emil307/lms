import { z } from "zod";

export type UpdateGroupFormValidation = z.infer<typeof $UpdateGroupFormValidation>;

export const $UpdateGroupFormValidation = z.object({
    courseId: z.string({ required_error: "Выберите курс" }),
    teacherId: z.string().optional(),
    name: z.string({ required_error: "Введите название группы" }),
    maxStudentsCount: z.string({ required_error: "Укажите количество учеников" }).refine((value) => Number(value) > 0, {
        message: "Не менее одного ученика",
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
