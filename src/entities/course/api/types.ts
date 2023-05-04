import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type AdminCourse = z.infer<typeof $adminCourse>;
export type Course = z.infer<typeof $course>;
export type CourseBlock = z.infer<typeof $courseBlock>;
export type FileDocument = z.infer<typeof $fileDocument>;
export type CourseDetailData = z.infer<typeof $courseDetailData>;
export type CourseProgram = z.infer<typeof $courseProgram>;
export type CourseTeacher = z.infer<typeof $courseTeacher>;
export type Review = z.infer<typeof $review>;

export type AdminCoursesFilters = z.infer<typeof $adminCoursesFilters>;

export type AdminCoursesRequestParamsType = TRequestFilterParams<AdminCoursesFilters>;
export type AdminCourseResourcesResponse = z.infer<typeof $getAdminCourseResources>;
export type AdminCoursesResponse = z.infer<typeof $adminCoursesResponse>;
export type GetCourseProgramResponse = z.infer<typeof $getCourseProgramResponse>;
export type GetMyCoursesResponse = z.infer<typeof $getMyCoursesResponse>;
export type GetCourseProgramModuleLessonsResponse = z.infer<typeof $getCourseProgramModuleLessonsResponse>;
export type GetCourseProgramModuleLessonsRequest = z.infer<typeof $getCourseProgramModuleLessonsRequest>;
export type GetCourseTeachersResponse = z.infer<typeof $getCourseTeachersResponse>;
export type GetCourseReviewsResponse = z.infer<typeof $getCourseReviewsResponse>;
export type GetCoursesResponse = z.infer<typeof $getCoursesResponse>;
export type GetFavoriteCoursesResponse = z.infer<typeof $getFavoriteCoursesResponse>;

export const $fileDocument = z.object({
    name: z.string(),
    path: z.string(),
    type: z.string(),
    size: z.number(),
});

const $adminCourseCategory = z.object({
    id: z.number(),
    name: z.string(),
});

const $adminCourseTag = z.object({
    id: z.number(),
    name: z.string(),
});

const $adminCourseTeacher = z.object({
    id: z.number(),
    profile: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
});

const $adminCourseAuthor = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
});

const $adminCourseDiscountType = z.object({
    type: z.string(),
    name: z.string(),
});

const $adminCourseDiscount = z.object({
    type: z.literal("percentage").or(z.literal("currency")),
    amount: z.number(),
    startingDate: z.string(),
    finishingDate: z.string(),
});

export const $getAdminCourseResources = z.object({
    categories: z.array($adminCourseCategory),
    subcategories: z.array($adminCourseCategory),
    tags: z.array($adminCourseTag),
    authors: z.array($adminCourseAuthor),
    teachers: z.array($adminCourseTeacher),
    discountTypes: z.array($adminCourseDiscountType),
});

export const $adminCourse = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    category: $adminCourseCategory.nullable(),
    tags: z.array($adminCourseTag),
    teachers: z.array($adminCourseTeacher),
    discount: $adminCourseDiscount.nullable(),
});

export const $adminCoursesResponse = $getPaginationResponseType($adminCourse);

export const $adminCoursesFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    // createdAt: z.string().datetime(),
    tags: z.array(z.string()),
    teachers: z.array(z.string()),
    category: z.string(),
    discountType: z.string(),
});

export const $courseProgram = z.object({
    id: z.number(),
    name: z.string(),
    lessonCount: z.number(),
    practiceCount: z.number(),
});

export const $courseProgramModuleLesson = z.object({
    name: z.string(),
    hasHomework: z.boolean(),
    hasTest: z.boolean(),
});

export const $courseTeacher = z.object({
    id: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    courseCount: z.number(),
    profile: z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        patronymic: z.string(),
        description: z.string(),
        avatar: $fileDocument,
    }),
});

export const $review = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    avatar: $fileDocument,
    rating: z.number(),
    course: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        isPurchased: z.boolean(),
        isFavorite: z.boolean(),
    }),
    createdAt: z.string().datetime(),
    content: z.string(),
});

export const $courseDetailData = z.object({
    name: z.string(),
    picture: z.object({
        data: $fileDocument,
    }),
    dateStart: z.string().datetime().nullable(),
    dateEnd: z.string().datetime().nullable(),
    availableSeats: z.number(),
    lessonCount: z.number(),
    price: z.number(),
    rating: z.number(),
    reviewCount: z.number(),
    description: z.string(),
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
        data: z
            .array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                    slug: z.string(),
                })
            )
            .length(2),
    }),
    tags: z.object({
        data: z.array(z.object({ id: z.number(), name: z.string(), slug: z.string() })),
    }),

    author: z
        .object({
            data: z.object({
                firstName: z.string(),
                lastName: z.string(),
                patronymic: z.string(),
                avatar: z.object({
                    data: $fileDocument,
                }),
                description: z.string(),
            }),
        })
        .nullable(),
    isInteractive: z.boolean(),
    isDiscount: z.boolean(),
    isPurchased: z.boolean(),
    isFavorite: z.boolean(),
    lessons: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    practice: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    isNew: z.boolean(),
    //TODO: currentLesson изменит схему после того как будет реальный эндпоинт
    currentLesson: z.null(),
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
            .nullable(),
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

export const $getMyCoursesResponse = $getPaginationResponseType($courseBlock);

export const $getCourseProgramResponse = z.object({
    moduleCount: z.number(),
    lessonCount: z.number(),
    homeworkCount: z.number(),
    testCount: z.number(),
    dateStart: z.string().datetime().nullable(),
    dateEnd: z.string().datetime().nullable(),
    modules: $getPaginationResponseType($courseProgram),
});

export const $getCourseProgramModuleLessonsResponse = $getPaginationResponseType($courseProgramModuleLesson);

export const $getCoursesResponse = $getPaginationResponseType($course);

export const $getCourseProgramModuleLessonsRequest = z.object({
    courseId: z.number(),
    programId: z.number(),
});

export const $getCourseTeachersResponse = $getPaginationResponseType($courseTeacher);

export const $getCourseReviewsResponse = z.object({
    averageRating: z.number(),
    reviewCount: z.number(),
    reviews: $getPaginationResponseType($review),
});

export const $getFavoriteCoursesResponse = $getPaginationResponseType($course);
