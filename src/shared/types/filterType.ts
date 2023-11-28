import { z } from "zod";
import { FilterTypes } from "@shared/constant";

export type FilterType = z.infer<typeof $FilterType>;

export const $FilterType = z.nativeEnum(FilterTypes);
