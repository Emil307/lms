import { z } from "zod";

export type AttachCourseToCoursePackageFormValidation = z.infer<typeof $AttachCourseToCoursePackageFormValidation>;

export const $AttachCourseToCoursePackageFormValidation = z.object({
    ids: z.string().array(),
});
