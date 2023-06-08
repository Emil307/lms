import { z } from "zod";
import { $LastUpdated, $UploadedFile, $getFiltersRequestType, $getMultiValueObjectType, $getPaginationResponseType } from "@shared/types";

/**
 *
 * GENERAL TYPES
 *
 */

export type UserRating = z.infer<typeof $UserRating>;
export type ArticleMeta = z.infer<typeof $ArticleMeta>;

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminArticle = z.infer<typeof $AdminArticle>;
export type AdminArticleFromList = z.infer<typeof $AdminArticleFromList>;
export type GetAdminArticleResponse = z.infer<typeof $GetAdminArticleResponse>;
export type AdminArticleCategory = z.infer<typeof $AdminArticleCategory>;
export type AdminArticleTag = z.infer<typeof $AdminArticleTag>;
export type AdminArticleCourse = z.infer<typeof $AdminArticleCourse>;

//FILTERS
export type AdminArticlesFiltersForm = z.infer<typeof $AdminArticlesFiltersForm>;
export type AdminArticleFromArticlePackageFiltersForm = z.infer<typeof $AdminArticleFromArticlePackageFiltersForm>;
export type AdminArticleFromArticlePackageExtraFilters = z.infer<typeof $AdminArticleFromArticlePackageExtraFilters>;

//REQ/RESP
export type CreateArticleRequest = z.infer<typeof $CreateArticleRequest>;
export type CreateArticleResponse = z.infer<typeof $CreateArticleResponse>;
export type UpdateArticleRequest = z.infer<typeof $UpdateArticleRequest>;
export type UpdateArticleResponse = z.infer<typeof $UpdateArticleResponse>;
export type GetAdminArticlesResponse = z.infer<typeof $GetAdminArticlesResponse>;
export type GetAdminArticlesRequest = z.infer<typeof $GetAdminArticlesRequest>;
export type GetAdminArticlesResourcesResponse = z.infer<typeof $GetAdminArticlesResourcesResponse>;
export type DeleteAdminArticleMaterialRequest = z.infer<typeof $DeleteAdminArticleMaterialRequest>;
export type DeleteAdminArticleMaterialResponse = z.infer<typeof $DeleteAdminArticleMaterialResponse>;
export type UpdateArticleActivityRequest = z.infer<typeof $UpdateArticleActivityRequest>;
export type UpdateArticleActivityResponse = z.infer<typeof $UpdateArticleActivityResponse>;
export type GetAdminArticlesNoIncludedArticlePackageRequest = z.infer<typeof $GetAdminArticlesNoIncludedArticlePackageRequest>;
export type AttachMaterialFilesToArticleRequest = z.infer<typeof $AttachMaterialFilesToArticleRequest>;
export type AttachMaterialFilesToArticleResponse = z.infer<typeof $AttachMaterialFilesToArticleResponse>;
export type AttachCoursesToArticleRequest = z.infer<typeof $AttachCoursesToArticleRequest>;
export type AttachCoursesToArticleResponse = z.infer<typeof $AttachCoursesToArticleResponse>;
export type DeleteArticleCourseRequest = z.infer<typeof $DeleteArticleCourseRequest>;
export type DeleteArticleCourseResponse = z.infer<typeof $DeleteArticleCourseResponse>;

/**
 *
 * USER TYPES
 *
 */

export type Article = z.infer<typeof $Article>;
export type ArticleFromList = z.infer<typeof $ArticleFromList>;
export type ArticleCourse = z.infer<typeof $ArticleCourse>;
export type ArticleCategory = z.infer<typeof $ArticleCategory>;
export type ArticleTag = z.infer<typeof $ArticleTag>;
export type ArticleCategoryFromList = z.infer<typeof $ArticleCategoryFromList>;

//FILTERS
export type ArticleFiltersForm = z.infer<typeof $ArticleFiltersForm>;
export type ArticleAndArticleCategoryFiltersForm = z.infer<typeof $ArticleAndArticleCategoryFiltersForm>;

//REQ/RESP
export type GetArticleResponse = z.infer<typeof $GetArticleResponse>;
export type GetArticlesRequest = z.infer<typeof $GetArticlesRequest>;
export type GetArticlesResponse = z.infer<typeof $GetArticlesResponse>;
export type GetFavoriteArticlesRequest = z.infer<typeof $GetFavoriteArticlesRequest>;
export type GetFavoriteArticlesResponse = z.infer<typeof $GetFavoriteArticlesResponse>;
export type GetArticleCategoriesRequest = z.infer<typeof $GetArticleCategoriesRequest>;
export type GetArticleCategoriesResponse = z.infer<typeof $GetArticleCategoriesResponse>;
export type GetArticleFiltersResponse = z.infer<typeof $GetArticleFiltersResponse>;
export type GetArticleCoursesResponse = z.infer<typeof $GetArticleCoursesResponse>;
export type GetAdminArticleFiltersResponse = z.infer<typeof $GetAdminArticleFiltersResponse>;
export type GetAdminArticleResourcesCreateResponse = z.infer<typeof $GetAdminArticleResourcesCreateResponse>;
export type UpdateArticleRatingRequest = z.infer<typeof $UpdateArticleRatingRequest>;
export type UpdateArticleRatingResponse = z.infer<typeof $UpdateArticleRatingResponse>;
export type DeleteArticleRatingRequest = z.infer<typeof $DeleteArticleRatingRequest>;
export type DeleteArticleRatingResponse = z.infer<typeof $DeleteArticleRatingResponse>;
export type UpdateArticleFavoriteRequest = z.infer<typeof $UpdateArticleFavoriteRequest>;
export type UpdateArticleFavoriteResponse = z.infer<typeof $UpdateArticleFavoriteResponse>;
export type GetFavoriteArticleResponse = z.infer<typeof $GetFavoriteArticleResponse>;

/**
 *
 * GENERAL ZOD
 *
 */
export const $UserRating = z.literal("like").or(z.literal("dislike"));
export const $ArticleMeta = z.object({
    prev: z.number().nullable(),
    next: z.number().nullable(),
});

/**
 *
 * ADMIN ZOD
 *
 */
export const $AdminArticleCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminArticleTag = $AdminArticleCategory;

export const $AdminArticleCourse = $AdminArticleCategory;

export const $AdminArticle = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    isActive: z.boolean(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    likesCount: z.number(),
    dislikesCount: z.number(),
    category: $AdminArticleCategory.nullable(),
    subcategories: $AdminArticleCategory.array(),
    tags: $AdminArticleTag.array(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $AdminArticleFromList = $AdminArticle
    .pick({
        id: true,
        name: true,
        isActive: true,
        category: true,
        subcategories: true,
    })
    .extend({
        courses: $AdminArticleCourse.array(),
    });

export const $GetAdminArticleResponse = $AdminArticle;

export const $CreateArticleRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    content: z.string({ required_error: "Введите контент" }),
    isActive: z.boolean(),
    categoryId: z.coerce
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите категорию",
        }),
    subcategories: z.string().array().min(1, "Выберите подкатегорию"),
    tags: z.array(z.string()).optional(),
});

export const $CreateArticleResponse = $AdminArticle;

export const $UpdateArticleRequest = $CreateArticleRequest.extend({
    id: z.string(),
});

export const $UpdateArticleResponse = $AdminArticle;

export const $GetAdminArticlesResponse = $getPaginationResponseType($AdminArticleFromList);

export const $GetAdminArticlesResourcesResponse = z.object({
    categories: $getPaginationResponseType($AdminArticleCategory),
    subcategories: $getPaginationResponseType($AdminArticleCategory),
    courses: $getPaginationResponseType($AdminArticleCourse),
    tags: $getPaginationResponseType($AdminArticleTag),
});

export const $DeleteAdminArticleMaterialRequest = z.object({
    articleId: z.string(),
    materialId: z.number(),
});

export const $DeleteAdminArticleMaterialResponse = z.null();

export const $UpdateArticleActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateArticleActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $AdminArticlesFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryId: z.string(),
    subcategoryId: z.string(),
    courseIds: z.string(),
});

export const $AdminArticlesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            "category.id": z.string(),
            subcategoryIds: z.string(),
            courseIds: z.string(),
            articlePackageIds: z.string(),
        })
        .partial(),
});

export const $GetAdminArticlesRequest = $getFiltersRequestType($AdminArticlesRequest);

export const $GetAdminArticleFiltersResponse = z.object({
    categories: z.array($AdminArticleCategory),
    subcategories: z.array($AdminArticleCategory),
    tags: z.array($AdminArticleTag),
    courses: z.array($AdminArticleCourse),
});

export const $GetAdminArticleResourcesCreateResponse = $GetAdminArticleFiltersResponse;

export const $AdminArticleFromArticlePackageFiltersForm = z.object({
    query: z.string(),
    categoryId: z.string(),
    subcategoryId: z.string(),
});

export const $AdminArticleFromArticlePackageExtraFilters = z.object({
    articlePackageIds: z.string(),
});
export const $AdminArticlesNoIncludedArticlePackageRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            "category.id": z.string(),
            "subcategory.id": z.string(),
            courseIds: z.string(),
            articlePackageIds: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetAdminArticlesNoIncludedArticlePackageRequest = $getFiltersRequestType($AdminArticlesNoIncludedArticlePackageRequest);

export const $AttachMaterialFilesToArticleRequest = z.object({
    articleId: z.string(),
    fileIds: z.string().array(),
});

export const $AttachMaterialFilesToArticleResponse = z.null();

export const $AttachCoursesToArticleRequest = z.object({
    articleId: z.string(),
    courseIds: z.string().array(),
});

export const $AttachCoursesToArticleResponse = z.null();

export const $DeleteArticleCourseRequest = z.object({
    articleId: z.string(),
    courseId: z.number(),
});

export const $DeleteArticleCourseResponse = z.null();

/**
 *
 * USER ZOD
 *
 */

export const $ArticleCategory = $AdminArticleCategory;
export const $ArticleTag = $AdminArticleTag;

export const $Article = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    isAvailable: z.boolean(),
    isFavorite: z.boolean(),
    userRating: $UserRating.nullable(),
    likesCount: z.number(),
    dislikesCount: z.number(),
    files: $UploadedFile.array(),
    category: $ArticleCategory.merge(z.object({ id: z.number().nullable() })).nullable(),
    subcategories: $ArticleCategory.array(),
    tags: $ArticleTag.array(),
});

export const $ArticleFromList = $Article.pick({
    id: true,
    name: true,
    isAvailable: true,
    isFavorite: true,
    userRating: true,
    likesCount: true,
    dislikesCount: true,
    category: true,
});

export const $ArticleFiltersForm = z.object({
    categoryId: z.string().nullable(),
    articlePackageIds: z.string(),
});

export const $ArticlesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            "category.id": z.string().nullable(),
            articlePackageIds: z.string(),
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            subcategoryIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $GetArticlesRequest = $getFiltersRequestType($ArticlesRequest);

export const $GetArticleResponse = $Article;

export const $FavoriteArticlesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            subcategoryIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $GetFavoriteArticlesRequest = $getFiltersRequestType($FavoriteArticlesRequest);

export const $GetArticlesResponse = $getPaginationResponseType($ArticleFromList);

export const $GetFavoriteArticlesResponse = $getPaginationResponseType($ArticleFromList);

export const $ArticleCategoryFromList = $ArticleCategory.pick({ name: true }).extend({
    id: z.number().nullable(),
    articlesCount: z.number(),
});

export const $GetArticleCategoriesResponse = $getPaginationResponseType($ArticleCategoryFromList);

export const $ArticleAndArticleCategoryFiltersForm = z.object({
    query: z.string(),
    tags: z.array(z.string()),
    subcategoryIds: z.array(z.string()),
    categoryId: z.string().optional(),
});

export const $ArticleCategoriesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            subcategoryIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $GetArticleCategoriesRequest = $getFiltersRequestType($ArticleCategoriesRequest);

export const $ArticleCourse = z.object({
    id: z.number(),
    name: z.string(),
    articleCount: z.number(),
});

export const $GetArticleCoursesResponse = $getPaginationResponseType($ArticleCourse);

export const $GetArticleFiltersResponse = z.object({
    subcategories: z.array($AdminArticleCategory),
    tags: z.array($AdminArticleTag),
});

export const $UpdateArticleRatingRequest = z.object({
    id: z.string(),
    status: $UserRating,
});

export const $UpdateArticleRatingResponse = z.object({
    status: $UserRating,
});

export const $DeleteArticleRatingRequest = z.object({
    id: z.string(),
});

export const $DeleteArticleRatingResponse = z.null();

export const $UpdateArticleFavoriteRequest = z.object({
    id: z.string(),
    isFavorite: z.boolean(),
});

export const $UpdateArticleFavoriteResponse = z.object({
    isFavorite: z.boolean(),
});

export const $GetFavoriteArticleResponse = z.object({
    //TODO: убрать мердж как бек исправит https://gitlab.addamant-work.ru/business-gallery/business-gallery-back/-/issues/124
    data: $Article.merge(
        z.object({
            likesCount: z.number().nullable(),
            dislikesCount: z.number().nullable(),
        })
    ),
    meta: $ArticleMeta,
});
