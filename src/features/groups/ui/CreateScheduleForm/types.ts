import dayjs from "dayjs";
import { z } from "zod";

export type CreateScheduleFormValidation = z.infer<typeof $CreateScheduleFormValidation>;

export const $CreateScheduleFormValidation = z.object({
    scheduleDate: z.coerce
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите датy",
        })
        .refine(
            (value) => {
                const currentDate = dayjs().set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0);
                const newDate = dayjs(value);
                return newDate.isAfter(currentDate) || newDate.isSame(currentDate);
            },
            {
                message: "Дата не может быть в прошлом",
            }
        ),
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
