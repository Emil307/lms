import { z } from "zod";
import { $getDateObjectType, $getFiltersRequestType, $getMultiValueObjectType, $Discount, $UploadedFile, $getPaginationResponseType } from "@shared/types";

export type AdminCourse = z.infer<typeof $AdminCourse>;
export type Course = z.infer<typeof $Course>;
export type CourseBlock = z.infer<typeof $CourseBlock>;
export type FileDocument = z.infer<typeof $FileDocument>;
export type CourseDetailData = z.infer<typeof $CourseDetailData>;
export type CourseProgram = z.infer<typeof $CourseProgram>;
export type CourseTeacher = z.infer<typeof $CourseTeacher>;
export type Review = z.infer<typeof $Review>;

export type AdminCoursesFiltersForm = z.infer<typeof $AdminCoursesFiltersForm>;

export type GetAdminCoursesRequest = z.infer<typeof $GetAdminCoursesRequest>;
export type GetAdminCourseResourcesResponse = z.infer<typeof $GetAdminCourseResourcesResponse>;
export type GetAdminCoursesResponse = z.infer<typeof $GetAdminCoursesResponse>;
export type GetCourseProgramResponse = z.infer<typeof $GetCourseProgramResponse>;
export type GetMyCoursesResponse = z.infer<typeof $GetMyCoursesResponse>;
export type GetCourseProgramModuleLessonsResponse = z.infer<typeof $GetCourseProgramModuleLessonsResponse>;
export type GetCourseProgramModuleLessonsRequest = z.infer<typeof $GetCourseProgramModuleLessonsRequest>;
export type GetCourseTeachersResponse = z.infer<typeof $GetCourseTeachersResponse>;
export type GetCourseReviewsResponse = z.infer<typeof $GetCourseReviewsResponse>;
export type GetCoursesResponse = z.infer<typeof $GetCoursesResponse>;
export type GetFavoriteCoursesResponse = z.infer<typeof $GetFavoriteCoursesResponse>;

export const $FileDocument = z.object({
    name: z.string(),
    path: z.string(),
    type: z.string(),
    size: z.number(),
});

const $AdminCourseCategory = z.object({
    id: z.number(),
    name: z.string(),
});

const $AdminCourseTag = z.object({
    id: z.number(),
    name: z.string(),
});

const $AdminCourseTeacher = z.object({
    id: z.number(),
    profile: z.object({
        firstName: z.string(),
        lastName: z.string(),
        patronymic: z.string().nullable()
    }),
});

const $AdminCourseAuthor = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
});

const $AdminCourseDiscountType = z.object({
    type: z.string(),
    name: z.string(),
});

export const $GetAdminCourseResourcesResponse = z.object({
    categories: z.array($AdminCourseCategory),
    subcategories: z.array($AdminCourseCategory),
    tags: z.array($AdminCourseTag),
    authors: z.array($AdminCourseAuthor),
    teachers: z.array($AdminCourseTeacher),
    discountTypes: z.array($AdminCourseDiscountType),
});

export const $AdminCourse = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    category: $AdminCourseCategory.nullable(),
    tags: z.array($AdminCourseTag),
    teachers: z.array($AdminCourseTeacher),
    discount: $Discount.nullable(),
});

export const $GetAdminCoursesResponse = $getPaginationResponseType($AdminCourse);

export const $AdminCoursesFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    tags: z.array(z.string()),
    teachers: z.array(z.string()),
    category: z.string(),
    discountType: z.string(),
});

export const $AdminCoursesFiltersRequest = z.object({
    query: z.string(),
    filter: z.object({
        isActive: z.literal("1").or(z.literal("0")),
        tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        teacherIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        createdAt: $getDateObjectType(z.literal("range")),
        "category.id": z.string(),
        "discount.type": z.string(),
    }),
});

export const $GetAdminCoursesRequest = $getFiltersRequestType($AdminCoursesFiltersRequest);

export const $CoursesFilters = z.object({
    hasDiscount: z.boolean(),
    query: z.string(),
    tags: z.array(z.string()),
    categoryId: z.string(),
    subcategoryId: z.string(),
    collectionIds: z.string(),
    packageIds: z.string().optional(),
});

export const $GetCoursesInfiniteRequest = $CoursesFilters.partial();

export const $CourseProgram = z.object({
    id: z.number(),
    name: z.string(),
    lessonCount: z.number(),
    practiceCount: z.number(),
});

export const $CourseProgramModuleLesson = z.object({
    name: z.string(),
    hasHomework: z.boolean(),
    hasTest: z.boolean(),
});

export const $CourseTeacher = z.object({
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
        avatar: $FileDocument,
    }),
});

export const $Review = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    avatar: $FileDocument,
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

export const $CourseDetailData = z.object({
    name: z.string(),
    picture: z.object({
        data: $FileDocument,
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
                    data: $FileDocument,
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

export const $Course = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    type: z.literal("interactive").or(z.literal("autonomous")),
    startingDate: z.coerce.date(),
    cover: $UploadedFile.nullable(),
    category: z
        .object({
            id: z.number(),
            name: z.string(),
        })
        .nullable(),

    discount: $Discount.nullable(),
});

export const $CourseBlock = z.object({
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

export const $GetMyCoursesResponse = $getPaginationResponseType($CourseBlock);

export const $GetCourseProgramResponse = z.object({
    moduleCount: z.number(),
    lessonCount: z.number(),
    homeworkCount: z.number(),
    testCount: z.number(),
    dateStart: z.string().datetime().nullable(),
    dateEnd: z.string().datetime().nullable(),
    modules: $getPaginationResponseType($CourseProgram),
});

export const $GetCourseProgramModuleLessonsResponse = $getPaginationResponseType($CourseProgramModuleLesson);

export const $GetCoursesResponse = $getPaginationResponseType($Course);

export const $GetCourseProgramModuleLessonsRequest = z.object({
    courseId: z.number(),
    programId: z.number(),
});

export const $GetCourseTeachersResponse = $getPaginationResponseType($CourseTeacher);

export const $GetCourseReviewsResponse = z.object({
    averageRating: z.number(),
    reviewCount: z.number(),
    reviews: $getPaginationResponseType($Review),
});

export const $GetFavoriteCoursesResponse = $getPaginationResponseType($Course);
