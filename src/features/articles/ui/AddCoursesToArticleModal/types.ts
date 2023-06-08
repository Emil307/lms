import { z } from "zod";

export type AttachCoursesToArticleFormValidation = z.infer<typeof $AttachCoursesToArticleFormValidation>;

export const $AttachCoursesToArticleFormValidation = z.object({
    courseIds: z.string().array(),
});
