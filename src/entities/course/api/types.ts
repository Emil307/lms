import { z } from "zod";
import {
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $Discount,
    $UploadedFile,
    $getPaginationResponseType,
    $DiscountType,
    $LastUpdated,
    $FilterType,
} from "@shared/types";
import { $StaticUserFromList } from "@entities/user";

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
export type AdminCoursesForCourseCollectionFiltersForm = z.infer<typeof $AdminCoursesForCourseCollectionFiltersForm>;
export type CoursesWithoutSelectedCoursesFromCoursePackageFilters = z.infer<typeof $CoursesWithoutSelectedCoursesFromCoursePackageFilters>;
export type AdminCoursesNoIncludedArticleFiltersForm = z.infer<typeof $AdminCoursesNoIncludedArticleFiltersForm>;

//REQ/RESP
export type AdminCourseFromList = z.infer<typeof $AdminCourseFromList>;
export type GetAdminCoursesRequest = z.infer<typeof $GetAdminCoursesRequest>;
export type GetAdminCourseResourcesRequest = z.infer<typeof $GetAdminCourseResourcesRequest>;
export type GetAdminCourseResourcesResponse = z.infer<typeof $GetAdminCourseResourcesResponse>;
export type GetAdminCoursesResponse = z.infer<typeof $GetAdminCoursesResponse>;
export type GetAdminCourseResponse = z.infer<typeof $GetAdminCourseResponse>;
export type CreateCourseFormValues = z.infer<typeof $CreateCourseFormValues>;
export type UpdateCourseFormValues = z.infer<typeof $UpdateCourseFormValues>;
export type CreateCourseRequest = z.infer<typeof $CreateCourseRequest>;
export type CreateCourseResponse = z.infer<typeof $CreateCourseResponse>;
export type UpdateCourseRequest = z.infer<typeof $UpdateCourseRequest>;
export type UpdateCourseResponse = z.infer<typeof $UpdateCourseResponse>;
export type UpdateCourseActivityRequest = z.infer<typeof $UpdateCourseActivityRequest>;
export type UpdateCourseActivityResponse = z.infer<typeof $UpdateCourseActivityResponse>;
export type UpdateCourseTypeRequest = z.infer<typeof $UpdateCourseTypeRequest>;
export type UpdateCourseTypeResponse = z.infer<typeof $UpdateCourseTypeResponse>;
export type UpdateCoursePopularityRequest = z.infer<typeof $UpdateCoursePopularityRequest>;
export type UpdateCoursePopularityResponse = z.infer<typeof $UpdateCoursePopularityResponse>;
export type UpdateCoursePublicationRequest = z.infer<typeof $UpdateCoursePublicationRequest>;
export type UpdateCoursePublicationResponse = z.infer<typeof $UpdateCoursePublicationResponse>;

/**
 *
 * USER TYPES
 *
 */
// export type Course = z.infer<typeof $Course>;
export type CourseDetails = z.infer<typeof $CourseDetails>;
export type MyCourse = z.infer<typeof $MyCourse>;
export type CourseFromList = z.infer<typeof $CourseFromList>;
export type CourseRating = z.infer<typeof $CourseRating>;
export type CourseAuthor = z.infer<typeof $CourseAuthor>;
export type CourseModule = z.infer<typeof $CourseModule>;
export type CourseModuleLesson = z.infer<typeof $CourseModuleLesson>;
export type CourseCategory = z.infer<typeof $CourseCategory>;
export type CourseTag = z.infer<typeof $CourseTag>;
export type CourseAvailableGroup = z.infer<typeof $CourseAvailableGroup>;

//FILTERS
export type CoursesFiltersForm = z.infer<typeof $CoursesFiltersForm>;
export type AdminArticleCoursesExtraFilters = z.infer<typeof $AdminArticleCoursesExtraFilters>;
export type AdminStudentCoursesExtraFilters = z.infer<typeof $AdminStudentCoursesExtraFilters>;

//REQ/RESP
export type GetCoursesRequest = z.infer<typeof $GetCoursesRequest>;
export type GetCoursesResponse = z.infer<typeof $GetCoursesResponse>;
export type GetCourseRequest = z.infer<typeof $GetCourseRequest>;
export type GetCourseResponse = z.infer<typeof $GetCourseResponse>;
export type GetCourseResourcesRequest = z.infer<typeof $GetCourseResourcesRequest>;
export type GetCourseResourcesResponse = z.infer<typeof $GetCourseResourcesResponse>;
export type DeleteFavoriteCoursesResponse = z.infer<typeof $DeleteFavoriteCoursesResponse>;
export type UpdateCourseFavoriteStatusRequest = z.infer<typeof $UpdateCourseFavoriteStatusRequest>;
export type UpdateCourseFavoriteStatusResponse = z.infer<typeof $UpdateCourseFavoriteStatusResponse>;

// MOCKS
export type CourseBlock = z.infer<typeof $CourseBlock>;

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
            patronymic: z.string().optional().nullable(),
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

const $AdminCourseRating = z.object({
    averageRating: z.number(),
    reviewsCount: z.number(),
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
    rating: $AdminCourseRating.nullable(),
    duration: z.string().nullable(),
    hasDiscount: z.boolean(),
    discount: $Discount.nullable(),
    isDemonstrative: z.boolean(),
    isFulfillment: z.boolean(),
    isPopular: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    accessExpirationDate: z.coerce.date().nullable().optional(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $CreateCourseResponse = $AdminCourse.omit({
    rating: true,
});

export const $GetAdminCourseResourcesRequest = z.object({
    type: $FilterType,
});

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
    accessExpirationDate: true,
    category: true,
    subcategory: true,
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

export const $AdminCoursesForCourseCollectionFiltersForm = $AdminCoursesForCoursePackageFiltersForm;

export const $AdminCoursesRequest = z.object({
    query: z.string().optional(),
    paginate: z.boolean().optional(),
    filter: z
        .object({
            isActive: z.boolean(),
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            teacherIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            collectionIds: $getMultiValueObjectType(z.string(), z.literal("or")).or($getMultiValueObjectType(z.string(), z.literal("not"))),
            packageIds: $getMultiValueObjectType(z.string(), z.literal("or")).or($getMultiValueObjectType(z.string(), z.literal("not"))),
            createdAt: $getDateObjectType(z.literal("range")),
            "category.id": z.string().nullable(),
            "subcategory.id": z.string(),
            "discount.type": z.string(),
            articleIds: z.string().or($getMultiValueObjectType(z.string(), z.literal("not"))),
            studentIds: $getMultiValueObjectType(z.string(), z.literal("or")).or($getMultiValueObjectType(z.string(), z.literal("not"))),
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
        duration: z.string().nullable().optional(),
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

export const $UpdateCourseResponse = $AdminCourse.omit({
    rating: true,
});

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

export const $UpdateCoursePublicationRequest = z.object({
    id: z.string(),
    isFulfillment: z.boolean(),
});
export const $UpdateCoursePublicationResponse = $UpdateCoursePublicationRequest.pick({
    isFulfillment: true,
});

export const $AdminArticleCoursesExtraFilters = z.object({
    articleId: z.string(),
});

export const $AdminStudentCoursesExtraFilters = z.object({
    studentId: z.string(),
});

export const $AdminCoursesNoIncludedArticleFiltersForm = z.object({
    query: z.string(),
    categoryId: z.string(),
    subcategoryId: z.string(),
    tagIds: z.string().array(),
});

/**
 * USER ZOD
 */

export const $CourseCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $CourseTag = $CourseCategory;

export const $CourseRating = z.object({
    reviewsCount: z.number(),
    averageRating: z.number(),
});

//TODO: Заменить из апи авторов
export const $CourseAuthor = z.object({
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullable(),
    description: z.string().nullable(),
    avatar: $UploadedFile.nullable(),
});

export const $CourseModuleLesson = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    content: z.string().optional(),
    hasTest: z.boolean(),
    hasHomework: z.boolean(),
});

export const $CourseModule = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    lessonsCount: z.number(),
    homeworksCount: z.number(),
    lessons: $CourseModuleLesson.array(),
});

export const $CourseAvailableGroup = z.object({
    id: z.number(),
    name: z.string(),
    status: z.object({ type: z.string(), name: z.string() }),
    educationStartDate: z.coerce.date(),
    educationFinishDate: z.coerce.date(),
    studentsCount: z.number(),
    freePlacesCount: z.number(),
});

export const $Course = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    discountPrice: z.number(),
    type: $CourseType,
    isFavorite: z.boolean(),
    isOwn: z.boolean(),
    lessonsCount: z.number(),
    modulesCount: z.number(),
    testsCount: z.number(),
    homeworksCount: z.number(),
    cover: $UploadedFile.nullable(),
    category: $CourseCategory.nullable(),
    subcategory: $CourseCategory.nullable(),
    tags: $CourseTag.array(),
    authors: $CourseAuthor.array(),
    teachers: $StaticUserFromList.array(),
    discount: $Discount.nullable(),
    rating: $CourseRating.nullable(),
    modules: $CourseModule.array(),
    availableGroup: $CourseAvailableGroup.nullable(),
    duration: z.string().nullable(),
});

///MY COURSE
export const $MyCourseStatusName = z
    .literal("inProgress")
    .or(z.literal("notStarted"))
    .or(z.literal("completed"))
    .or(z.literal("archive"))
    .or(z.literal("all"));

export const $MyCourseTag = z.object({
    id: z.number(),
    name: z.string(),
});

export const $MyCourseCategory = $MyCourseTag;

export const $MyCourseStatus = z.object({
    name: $MyCourseStatusName,
    displayName: z.string(),
});

//TODO: Заменить из апи авторов
export const $MyCourseAuthor = z.object({
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullable(),
    description: z.string().nullable(),
    avatar: $UploadedFile.nullable(),
});

export const $GroupsCount = z.object({
    name: z.string(),
    displayName: z.string(),
    count: z.number(),
});

export const $MyCourse = z.object({
    groupId: z.number(),
    courseId: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    type: $CourseType,
    availableTo: z.coerce.date().nullable(),
    status: $MyCourseStatus,
    nextLesson: z
        .object({
            id: z.number(),
            name: z.string(),
        })
        .nullable(),
    lessonsCount: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    practiceCount: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    cover: $UploadedFile.nullable(),
    category: $MyCourseCategory.nullable(),
    tags: $MyCourseTag.array(),
    authors: $MyCourseAuthor.array(),
    rating: z.object({
        reviewsCount: z.number(),
        averageRating: z.number(),
    }),
});

//MY COURSE end

export const $CourseFromList = $Course
    .pick({
        id: true,
        name: true,
        description: true,
        price: true,
        discountPrice: true,
        type: true,
        isFavorite: true,
        isOwn: true,
        lessonsCount: true,
        cover: true,
        category: true,
        subcategory: true,
        discount: true,
    })
    .extend({
        availableGroup: $CourseAvailableGroup
            .omit({
                studentsCount: true,
                freePlacesCount: true,
            })
            .nullable(),
    });

export const $GetCoursesResponse = $getPaginationResponseType($CourseFromList);

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

export const $GetCourseResourcesRequest = $GetAdminCourseResourcesRequest;

export const $GetCourseResourcesResponse = z.object({
    categories: z.array($CourseCategory),
    subcategories: z.array($CourseCategory),
    tags: z.array($CourseTag),
    prices: z.object({ lowest: z.number(), highest: z.number() }),
});

export const $GetCourseRequest = z.object({
    id: z.string(),
});

export const $CourseDetails = $Course.pick({
    id: true,
    name: true,
    description: true,
    price: true,
    discountPrice: true,
    type: true,
    isFavorite: true,
    lessonsCount: true,
    modulesCount: true,
    testsCount: true,
    homeworksCount: true,
    cover: true,
    category: true,
    tags: true,
    authors: true,
    teachers: true,
    discount: true,
    rating: true,
    modules: true,
    availableGroup: true,
    duration: true,
});

export const $GetCourseResponse = $CourseDetails.or($MyCourse);

export const $DeleteFavoriteCoursesResponse = z.null();

export const $UpdateCourseFavoriteStatusRequest = z.object({
    id: z.string(),
    isFavorite: z.boolean(),
});

export const $UpdateCourseFavoriteStatusResponse = z.object({
    isFavorite: z.boolean(),
});

// TODO:
// MOCKS
//

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

export const $GetFavoriteCoursesResponse = $getPaginationResponseType($Course);

export const $CoursesWithoutSelectedCoursesFromCoursePackageFilters = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.boolean(),
            tags: $getMultiValueObjectType(z.string(), z.literal("or")),
            "category.id": z.string(),
            "subcategory.id": z.string(),
            packageIds: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});
