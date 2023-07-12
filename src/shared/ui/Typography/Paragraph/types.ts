import { z } from "zod";

export type ParagraphVariant = z.infer<typeof $ParagraphVariant>;

export const $ParagraphVariant = z.enum([
    "large",
    "small-m",
    "small-semi",
    "text-small-m",
    "text-small-semi",
    "text-caption",
    "text-smaller",
    "text-micro",
]);
