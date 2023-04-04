import { z } from "zod";
import { $pagination } from "@shared/types";

export type CourseBlock = z.infer<typeof $courseBlock>;

export type GetMyCoursesResponse = z.infer<typeof $getMyCoursesResponse>;

export const $courseBlock = z.object({
    id: z.number(),
    name: z.string(),
    picture: z.object({
        data: z.object({
            name: z.string(),
            path: z.string(),
            type: z.string(),
            size: z.number(),
        }),
    }),
    dateEnd: z.string().datetime().nullable(),
    lessons: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    practice: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    isNew: z.boolean(),
    //TODO: Должно быть поле inProgress
    onProgress: z.boolean(),
    currentLesson: z
        .object({
            id: z.number(),
            title: z.string(),
        })
        .nullable(),
});

export const $getMyCoursesResponse = z.object({
    data: z.array($courseBlock),
    meta: z.object({
        pagination: $pagination,
    }),
});
