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

export type AdminCourse = z.infer<typeof $AdminCourse>;
export type Course = z.infer<typeof $Course>;
export type CourseBlock = z.infer<typeof $CourseBlock>;
export type FileDocument = z.infer<typeof $FileDocument>;
export type CourseDetailData = z.infer<typeof $CourseDetailData>;
export type CourseProgram = z.infer<typeof $CourseProgram>;
export type CourseTeacher = z.infer<typeof $CourseTeacher>;
export type Review = z.infer<typeof $Review>;

export type AdminCoursesFiltersForm = z.infer<typeof $AdminCoursesFiltersForm>;

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

export type GetCoursesRequest = z.infer<typeof $GetCoursesFiltersRequest>;
export type GetCourseProgramResponse = z.infer<typeof $GetCourseProgramResponse>;
export type GetMyCoursesResponse = z.infer<typeof $GetMyCoursesResponse>;
export type GetCourseProgramModuleLessonsResponse = z.infer<typeof $GetCourseProgramModuleLessonsResponse>;
export type GetCourseProgramModuleLessonsRequest = z.infer<typeof $GetCourseProgramModuleLessonsRequest>;
export type GetCourseTeachersResponse = z.infer<typeof $GetCourseTeachersResponse>;
export type GetCourseReviewsResponse = z.infer<typeof $GetCourseReviewsResponse>;
export type GetCoursesResponse = z.infer<typeof $GetCoursesResponse>;
export type GetFavoriteCoursesResponse = z.infer<typeof $GetFavoriteCoursesResponse>;
export type GetCoursesInfiniteRequest = z.infer<typeof $GetCoursesInfiniteRequest>;

export type CourseType = z.infer<typeof $CourseType>;

export const $FileDocument = z.object({
    name: z.string(),
    path: z.string(),
    type: z.string(),
    size: z.number(),
});

export const $CourseType = z.literal("interactive").or(z.literal("autonomous"));

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
    email: z.string().optional(),
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

export const $AdminCoursesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            teacherIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            createdAt: $getDateObjectType(z.literal("range")),
            "category.id": z.string(),
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
        price: z.string({ required_error: "Введите стоимость" }).refine(
            (value) => {
                const price = Number(value);
                return Number.isInteger(price) && price >= 0;
            },
            { message: "Стоимость должна быть целым неотрицательным числом" }
        ),
        isInteractive: z.boolean(),
        isActive: z.boolean(),
        isDemonstrative: z.boolean(),
        isPopular: z.boolean(),
        hasDiscount: z.boolean(),
        discount: z.object({
            type: $DiscountType,
            amount: z.string().optional(),
            startingDate: z.date().nullable(),
            finishingDate: z.date().nullable(),
        }),
    })
    .refine(
        (data) => {
            if (!data.category) {
                return true;
            }
            return !!data.subCategory;
        },
        {
            message: "Выберите подкатегорию",
            path: ["subCategory"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasDiscount) {
                return true;
            }
            const amount = Number(data.discount.amount);
            return Number.isInteger(amount) && amount > 0;
        },
        {
            message: "Размер скидки должен быть целым числом и больше 0",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if ((!data.hasDiscount && !data.discount.amount) || data.discount.type === "currency") {
                return true;
            }
            return 100 >= Number(data.discount.amount);
        },
        {
            message: "Размер скидки не может быть больше 100%",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasDiscount || !data.price || !data.discount.amount || data.discount.type === "percentage") {
                return true;
            }
            return Number(data.price) >= Number(data.discount.amount);
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
    category: z.string().optional(),
    subCategory: z.string().optional(),
    tagIds: z.array(z.string()),
    hasAuthors: z.boolean(),
    authorIds: z.array(z.string()),
    hasTeachers: z.boolean(),
    teacherIds: z.array(z.string()),
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
    type: $CourseType,
    isActive: z.boolean(),
    isDemonstrative: z.boolean(),
    isPopular: z.boolean(),
    hasDiscount: z.boolean(),
    discount: z
        .object({
            type: $DiscountType,
            amount: z.string().optional(),
            startingDate: z.string(),
            finishingDate: z.string(),
        })
        .nullish(),
});

export const $UpdateCourseFormValues = $CreateCourseFormValues;

export const $CoursesFilters = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            hasDiscount: z.boolean(),
            tags: $getMultiValueObjectType(z.string(), z.literal("or")),
            "category.id": z.string(),
            "subcategory.id": z.string(),
            collectionIds: z.string(),
            packageIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $UpdateCourseRequest = $CreateCourseRequest.extend({
    id: z.string(),
});
export const $UpdateCourseResponse = $AdminCourse;

export const $GetCoursesFiltersRequest = $getFiltersRequestType($CoursesFilters);

export const $GetCoursesInfiniteRequest = $CoursesFilters;

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
    type: $CourseType,
    startingDate: z.coerce.date(),
    isFavorite: z.boolean(),
    lessonsCount: z.number(),
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
