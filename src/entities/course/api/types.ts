import { z } from "zod";
import { $pagination } from "@shared/types";

export type CourseBlock = z.infer<typeof $courseBlock>;
export type Course = z.infer<typeof $course>;

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

export const $course = z.object({
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
    dateStart: z.string().datetime().nullable(),
    lessonCount: z.number(),
    price: z.number(),
    discount: z.object({
        data: z
            .object({
                isActive: z.boolean(),
                type: z.string(),
                value: z.number(),
                from: z.string().datetime().nullable(),
                to: z.string().datetime().nullable(),
            })
            .partial(),
    }),
    categories: z.object({
        data: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
        }),
    }),
    isInteractive: z.boolean(),
    isDiscount: z.boolean(),
    isPurchased: z.boolean(),
    isFavorite: z.boolean(),
});

export const $getMyCoursesResponse = z.object({
    data: z.array($courseBlock),
    meta: z.object({
        pagination: $pagination,
    }),
});
