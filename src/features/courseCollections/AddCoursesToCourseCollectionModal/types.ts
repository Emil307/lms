import { z } from "zod";

export type AttachCoursesToCourseCollectionFormValidation = z.infer<typeof $AttachCoursesToCourseCollectionFormValidation>;

export const $AttachCoursesToCourseCollectionFormValidation = z.object({
    ids: z.string().array(),
});
