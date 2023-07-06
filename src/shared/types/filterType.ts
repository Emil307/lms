import { z } from "zod";

export type FilterType = z.infer<typeof $FilterType>;

export const $FilterType = z.literal("select").or(z.literal("manipulation"));
