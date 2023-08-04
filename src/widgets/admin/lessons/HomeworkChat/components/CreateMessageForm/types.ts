import { z } from "zod";

export type CreateMessageForm = z.infer<typeof $CreateMessageForm>;

export const $CreateMessageForm = z.object({
    content: z.string({ required_error: "Введите сообщение" }),
});
