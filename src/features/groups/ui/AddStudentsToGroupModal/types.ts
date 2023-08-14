import { z } from "zod";

export type AttachArticlesToArticlePackageFormValidation = z.infer<typeof $AttachArticlesToArticlePackageFormValidation>;

export const $AttachArticlesToArticlePackageFormValidation = z.object({
    ids: z.string().array(),
});
