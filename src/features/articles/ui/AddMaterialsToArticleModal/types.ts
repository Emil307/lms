import { z } from "zod";

export type AttachMaterialsToArticleFormValidation = z.infer<typeof $AttachMaterialsToArticleFormValidation>;

export const $AttachMaterialsToArticleFormValidation = z.object({
    fileIds: z.string().array(),
});
