import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateAboutValidation = z.infer<typeof $UpdateAboutValidation>;

export const $UpdateAboutValidation = z.object({
    image: $UploadedFile.nullable(),
    aboutPageTitle: z.string({ required_error: "Введите заголовок" }),
    aboutPageShortContent: z.string({ required_error: "Введите описание" }),
    aboutPageFullContent: z.string(),
});
