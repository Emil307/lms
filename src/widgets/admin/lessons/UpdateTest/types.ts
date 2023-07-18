import { z } from "zod";

export type UpdateTestFormValues = z.infer<typeof $UpdateTestFormValues>;

export const $UpdateTestFormValues = z
    .object({
        correctAnswersCount: z
            .number({ required_error: "Введите количество верных ответов" })
            .int("Число должно быть целым")
            .nonnegative("Количество не может быть отрицательным"),
        tasks: z.array(
            z
                .object({
                    id: z.number(),
                    order: z.number(),
                    content: z.string({ required_error: "Введите вопрос" }),
                    answers: z.array(
                        z.object({
                            id: z.number(),
                            order: z.number(),
                            content: z.string({ required_error: "Введите ответ" }),
                            isCorrect: z.boolean(),
                        })
                    ),
                })
                .refine(
                    (task) => {
                        return task.answers.length > 1;
                    },
                    {
                        message: "Добавьте хотя бы 2 ответа на вопрос",
                    }
                )
                .refine(
                    (task) => {
                        return task.answers.some((answer) => answer.isCorrect);
                    },
                    {
                        message: "Отметьте хотя бы 1 верный ответ",
                    }
                )
        ),
    })
    .refine(
        (data) => {
            return data.correctAnswersCount <= data.tasks.length;
        },
        {
            message: "Количество верных ответов не может быть больше количества вопросов",
            path: ["correctAnswersCount"],
        }
    );
