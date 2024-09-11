import { z } from "zod";

export type TCreateMessageForm = z.infer<typeof $CreateMessageForm>;

export const $CreateMessageForm = z.object({
    content: z.string({ required_error: "Введите сообщение" }),
});
