import { z } from "zod";
import {
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $Discount,
    $UploadedFile,
    $getPaginationResponseType,
    $DiscountType,
} from "@shared/types";

/**
 *
 * GENERAL TYPES
 *
 */
export type CourseType = z.infer<typeof $CourseType>;

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminCourse = z.infer<typeof $AdminCourse>;

//FILTERS
export type AdminCoursesFiltersForm = z.infer<typeof $AdminCoursesFiltersForm>;
export type AdminCoursesForCoursePackageFiltersForm = z.infer<typeof $AdminCoursesForCoursePackageFiltersForm>;
export type CoursesWithoutSelectedCoursesFromCoursePackageFilters = z.infer<typeof $CoursesWithoutSelectedCoursesFromCoursePackageFilters>;

//REQ/RESP
export type AdminCourseFromList = z.infer<typeof $AdminCourseFromList>;
export type GetAdminCoursesRequest = z.infer<typeof $GetAdminCoursesRequest>;
export type GetAdminCourseResourcesResponse = z.infer<typeof $GetAdminCourseResourcesResponse>;
export type GetAdminCoursesResponse = z.infer<typeof $GetAdminCoursesResponse>;
export type GetAdminCourseResponse = z.infer<typeof $GetAdminCourseResponse>;
export type CreateCourseFormValues = z.infer<typeof $CreateCourseFormValues>;
export type UpdateCourseFormValues = z.infer<typeof $UpdateCourseFormValues>;
export type CreateCourseRequest = z.infer<typeof $CreateCourseRequest>;
export type CreateCourseResponse = z.infer<typeof $CreateCourseResponse>;
export type UpdateCourseRequest = z.infer<typeof $UpdateCourseRequest>;
export type UpdateCourseResponse = z.infer<typeof $UpdateCourseResponse>;
export type GetAdminCoursesWithoutCoursesFromCoursePackageRequest = z.infer<typeof $GetAdminCoursesWithoutCoursesFromCoursePackageRequest>;
export type UpdateCourseActivityRequest = z.infer<typeof $UpdateCourseActivityRequest>;
export type UpdateCourseActivityResponse = z.infer<typeof $UpdateCourseActivityResponse>;
export type UpdateCourseTypeRequest = z.infer<typeof $UpdateCourseTypeRequest>;
export type UpdateCourseTypeResponse = z.infer<typeof $UpdateCourseTypeResponse>;
export type UpdateCoursePopularityRequest = z.infer<typeof $UpdateCoursePopularityRequest>;
export type UpdateCoursePopularityResponse = z.infer<typeof $UpdateCoursePopularityResponse>;

/**
 *
 * USER TYPES
 *
 */
export type Course = z.infer<typeof $Course>;
export type CourseBlock = z.infer<typeof $CourseBlock>;
export type CourseDetailData = z.infer<typeof $CourseDetailData>;
export type CourseProgram = z.infer<typeof $CourseProgram>;
export type CourseTeacher = z.infer<typeof $CourseTeacher>;
export type Review = z.infer<typeof $Review>;
export type CourseCategory = z.infer<typeof $CourseCategory>;
export type CourseSubCategory = z.infer<typeof $CourseSubCategory>;
export type CourseTag = z.infer<typeof $CourseTag>;

//FILTERS
export type CoursesFiltersForm = z.infer<typeof $CoursesFiltersForm>;

//REQ/RESP
export type GetCoursesRequest = z.infer<typeof $GetCoursesRequest>;
export type GetCoursesInfiniteRequest = z.infer<typeof $GetCoursesInfiniteRequest>;
export type GetCourseResourcesResponse = z.infer<typeof $GetCourseResourcesResponse>;

// MOCKS
export type GetCourseProgramResponse = z.infer<typeof $GetCourseProgramResponse>;
export type GetMyCoursesResponse = z.infer<typeof $GetMyCoursesResponse>;
export type GetCourseProgramModuleLessonsResponse = z.infer<typeof $GetCourseProgramModuleLessonsResponse>;
export type GetCourseProgramModuleLessonsRequest = z.infer<typeof $GetCourseProgramModuleLessonsRequest>;
export type GetCourseTeachersResponse = z.infer<typeof $GetCourseTeachersResponse>;
export type GetCourseReviewsResponse = z.infer<typeof $GetCourseReviewsResponse>;
export type GetCoursesResponse = z.infer<typeof $GetCoursesResponse>;
export type GetFavoriteCoursesResponse = z.infer<typeof $GetFavoriteCoursesResponse>;

/**
 * GENERAL ZOD
 */

export const $CourseType = z.literal("interactive").or(z.literal("autonomous"));

/**
 * ADMIN ZOD
 */

const $AdminCourseCategory = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
});

const $AdminCourseTag = z.object({
    id: z.number(),
    name: z.string(),
});

const $AdminCourseTeacher = z.object({
    id: z.number(),
    email: z.string().optional(),
    isActive: z.boolean(),
    profile: z
        .object({
            firstName: z.string(),
            lastName: z.string(),
            patronymic: z.string().optional(),
        })
        .optional(),
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

export const $AdminCourse = z.object({
    id: z.number(),
    name: z.string(),
    type: $CourseType,
    price: z.number(),
    discountPrice: z.number(),
    cover: $UploadedFile.nullable(),
    isActive: z.boolean(),
    description: z.string().nullable(),
    category: $AdminCourseCategory.nullable(),
    tags: z.array($AdminCourseTag),
    hasTeachers: z.boolean(),
    teachers: z.array($AdminCourseTeacher),
    subcategory: $AdminCourseCategory.nullable(),
    hasAuthors: z.boolean(),
    authors: z.array($AdminCourseAuthor),
    hasDiscount: z.boolean(),
    discount: $Discount.nullable(),
    isDemonstrative: z.boolean(),
    isFulfillment: z.boolean(),
    isPopular: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $CreateCourseResponse = $AdminCourse;

export const $GetAdminCourseResourcesResponse = z.object({
    categories: z.array($AdminCourseCategory),
    subcategories: z.array($AdminCourseCategory),
    tags: z.array($AdminCourseTag),
    authors: z.array($AdminCourseAuthor),
    teachers: z.array($AdminCourseTeacher),
    discountTypes: z.array($AdminCourseDiscountType),
});

export const $AdminCourseFromList = $AdminCourse.pick({
    id: true,
    name: true,
    price: true,
    discountPrice: true,
    isActive: true,
    createdAt: true,
    category: true,
    tags: true,
    teachers: true,
    discount: true,
});

export const $GetAdminCoursesResponse = $getPaginationResponseType($AdminCourseFromList);

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

export const $AdminCoursesForCoursePackageFiltersForm = z.object({
    query: z.string(),
    tags: z.array(z.string()),
    categoryId: z.string(),
    subcategoryId: z.string(),
});

export const $AdminCoursesRequest = z.object({
    query: z.string().optional(),
    paginate: z.boolean().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            teacherIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            packageIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            createdAt: $getDateObjectType(z.literal("range")),
            "category.id": z.string().nullable(),
            "subcategory.id": z.string(),
            "discount.type": z.string(),
        })
        .partial(),
});

export const $GetAdminCoursesRequest = $getFiltersRequestType($AdminCoursesRequest);
export const $GetAdminCourseResponse = $AdminCourse;

export const $CreateCourseFormValues = z
    .object({
        cover: $UploadedFile.nullable(),
        category: z.string().optional(),
        subCategory: z.string().optional(),
        tagIds: z.array(z.string()),
        hasAuthors: z.boolean(),
        authorIds: z.array(z.string()),
        hasTeachers: z.boolean(),
        teacherIds: z.array(z.string()),
        name: z.string({ required_error: "Введите название" }),
        description: z.string().optional(),
        price: z
            .number({ required_error: "Введите стоимость" })
            .int("Число должно быть целым")
            .nonnegative("Число должно не может быть отрицательным"),
        isInteractive: z.boolean(),
        isActive: z.boolean(),
        isDemonstrative: z.boolean(),
        isPopular: z.boolean(),
        hasDiscount: z.boolean(),
        discount: z.object({
            type: $DiscountType,
            amount: z.number(),
            startingDate: z.date().nullable(),
            finishingDate: z.date().nullable(),
        }),
    })
    .refine(
        (data) => {
            if (!data.hasDiscount) {
                return true;
            }
            return Number.isInteger(data.discount.amount) && data.discount.amount > 0;
        },
        {
            message: "Размер скидки должен быть целым пложительный числом",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasDiscount || data.discount.type === "currency") {
                return true;
            }
            return 100 >= data.discount.amount;
        },
        {
            message: "Размер скидки не может быть больше 100%",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasDiscount || data.discount.type === "percentage") {
                return true;
            }
            return data.price >= data.discount.amount;
        },
        {
            message: "Размер скидки не может быть больше стоимости",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasDiscount) {
                return true;
            }
            return !!data.discount.startingDate && !!data.discount.finishingDate;
        },
        {
            message: "Выберите период",
            path: ["discount.startingDate"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasTeachers) {
                return true;
            }
            return data.teacherIds.length > 0;
        },
        {
            message: "Выберите преподавателей",
            path: ["teacherIds"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasAuthors) {
                return true;
            }
            return data.authorIds.length > 0;
        },
        {
            message: "Выберите Авторов",
            path: ["authorIds"],
        }
    );

export const $CreateCourseRequest = z.object({
    coverId: z.number().nullable(),
    categoryId: z.number().optional(),
    subcategoryId: z.number().optional(),
    tagIds: z.array(z.string()),
    hasAuthors: z.boolean(),
    authorIds: z.array(z.string()),
    hasTeachers: z.boolean(),
    teacherIds: z.array(z.string()),
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    type: $CourseType,
    isActive: z.boolean(),
    isDemonstrative: z.boolean(),
    isPopular: z.boolean(),
    hasDiscount: z.boolean(),
    discount: z
        .object({
            type: $DiscountType,
            amount: z.number(),
            startingDate: z.string(),
            finishingDate: z.string(),
        })
        .nullish(),
});

export const $UpdateCourseFormValues = $CreateCourseFormValues;

export const $UpdateCourseRequest = $CreateCourseRequest.extend({
    id: z.string(),
});

export const $UpdateCourseResponse = $AdminCourse;

export const $UpdateCourseActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});
export const $UpdateCourseActivityResponse = $UpdateCourseActivityRequest.pick({
    isActive: true,
});

export const $UpdateCourseTypeRequest = z.object({
    id: z.string(),
    type: $CourseType,
});
export const $UpdateCourseTypeResponse = $UpdateCourseTypeRequest.pick({
    type: true,
});

export const $UpdateCoursePopularityRequest = z.object({
    id: z.string(),
    isPopular: z.boolean(),
});
export const $UpdateCoursePopularityResponse = $UpdateCoursePopularityRequest.pick({
    isPopular: true,
});

/**
 * USER ZOD
 */

export const $GetCourseResourcesResponse = $GetAdminCourseResourcesResponse
    .pick({
        categories: true,
        subcategories: true,
        tags: true,
    })
    .extend({
        prices: z.object({ lowest: z.number(), highest: z.number() }),
    });

export const $CoursesFiltersForm = z.object({
    query: z.string(),
    hasDiscount: z.boolean(),
    tags: z.array(z.string()),
    categoryId: z.string(),
    subcategoryIds: z.array(z.string()),
    isFavorite: z.boolean(),
    collectionIds: z.string(),
    packageIds: z.array(z.string()),
    discountPrice: z.number(),
});

export const $CoursesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            hasDiscount: z.boolean(),
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            "category.id": z.string(),
            "subcategory.id": $getMultiValueObjectType(z.string(), z.literal("or")),
            isFavorite: z.boolean(),
            collectionIds: z.string(),
            packageIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            discountPrice: $getMultiValueObjectType(z.string(), z.literal("lte")),
        })
        .partial(),
});

export const $GetCoursesRequest = $getFiltersRequestType($CoursesRequest);

export const $GetCoursesInfiniteRequest = $GetCoursesRequest.omit({ page: true, perPage: true });

export const $CourseCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $CourseSubCategory = $CourseCategory;

export const $CourseTag = $CourseCategory;

// TODO:
// MOCKS
//

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
        avatar: $UploadedFile,
    }),
});

export const $Review = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    avatar: $UploadedFile,
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
        data: $UploadedFile.nullable(),
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
                type: $DiscountType,
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
                    data: $UploadedFile,
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
    description: z.string().nullable(),
    price: z.number(),
    discountPrice: z.number(),
    type: $CourseType,
    isFavorite: z.boolean(),
    lessonsCount: z.number(),
    cover: $UploadedFile.nullable(),
    category: z
        .object({
            id: z.number(),
            name: z.string(),
            isActive: z.boolean(),
        })
        .nullable(),
    subcategory: z
        .object({
            id: z.number(),
            name: z.string(),
            isActive: z.boolean(),
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

export const $CoursesWithoutSelectedCoursesFromCoursePackageFilters = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            tags: $getMultiValueObjectType(z.string(), z.literal("or")),
            "category.id": z.string(),
            "subcategory.id": z.string(),
            packageIds: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetAdminCoursesWithoutCoursesFromCoursePackageRequest = $getFiltersRequestType(
    $CoursesWithoutSelectedCoursesFromCoursePackageFilters
);
