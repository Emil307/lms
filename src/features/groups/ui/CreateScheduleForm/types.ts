import { z } from "zod";

export type CreateScheduleFormValidation = z.infer<typeof $createScheduleFormValidation>;

export const $createScheduleFormValidation = z.object({
    scheduleDate: z.coerce
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите датy",
        }),
    scheduleTimings: z.array(
        z
            .object({
                from: z.coerce
                    .date()
                    .nullable()
                    .refine((value) => value !== null, {
                        message: "Выберите время",
                    }),
                to: z.coerce
                    .date()
                    .nullable()
                    .refine((value) => value !== null, {
                        message: "Выберите время",
                    }),
            })
            .refine(
                (value) => {
                    if (!value.from || !value.to) {
                        return true;
                    }
                    return value.from < value.to;
                },
                {
                    message: "Время должно быть больше начала",
                    path: ["to"],
                }
            )
    ),
});