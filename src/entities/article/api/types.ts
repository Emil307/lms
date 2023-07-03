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
export type AdminArticleCategory = z.infer<typeof $AdminArticleCategory>;
export type AdminArticleTag = z.infer<typeof $AdminArticleTag>;
export type AdminArticleCourse = z.infer<typeof $AdminArticleCourse>;

//FILTERS
export type AdminArticlesFiltersForm = z.infer<typeof $AdminArticlesFiltersForm>;
export type AdminArticleFromArticlePackageFiltersForm = z.infer<typeof $AdminArticleFromArticlePackageFiltersForm>;
export type AdminArticleFromArticlePackageExtraFilters = z.infer<typeof $AdminArticleFromArticlePackageExtraFilters>;

//REQ/RESP
export type GetAdminArticlesRequest = z.infer<typeof $GetAdminArticlesRequest>;
export type GetAdminArticlesNoIncludedArticlePackageRequest = z.infer<typeof $GetAdminArticlesNoIncludedArticlePackageRequest>;
export type GetAdminArticlesResponse = z.infer<typeof $GetAdminArticlesResponse>;
export type GetAdminArticleRequest = z.infer<typeof $GetAdminArticleRequest>;
export type GetAdminArticleResponse = z.infer<typeof $GetAdminArticleResponse>;
export type CreateArticleRequest = z.infer<typeof $CreateArticleRequest>;
export type CreateArticleResponse = z.infer<typeof $CreateArticleResponse>;
export type UpdateArticleRequest = z.infer<typeof $UpdateArticleRequest>;
export type UpdateArticleResponse = z.infer<typeof $UpdateArticleResponse>;
export type UpdateArticleActivityRequest = z.infer<typeof $UpdateArticleActivityRequest>;
export type UpdateArticleActivityResponse = z.infer<typeof $UpdateArticleActivityResponse>;
export type GetAdminArticleFiltersResponse = z.infer<typeof $GetAdminArticleFiltersResponse>;
export type GetAdminArticleResourcesCreateResponse = z.infer<typeof $GetAdminArticleResourcesCreateResponse>;
//articles <---> materials
export type DeleteAdminArticleMaterialRequest = z.infer<typeof $DeleteAdminArticleMaterialRequest>;
export type DeleteAdminArticleMaterialResponse = z.infer<typeof $DeleteAdminArticleMaterialResponse>;
export type AttachMaterialFilesToArticleRequest = z.infer<typeof $AttachMaterialFilesToArticleRequest>;
export type AttachMaterialFilesToArticleResponse = z.infer<typeof $AttachMaterialFilesToArticleResponse>;
//articles <---> courses
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
export type ArticleCategory = z.infer<typeof $ArticleCategory>;
export type ArticleSubCategory = z.infer<typeof $ArticleSubCategory>;
export type ArticleTag = z.infer<typeof $ArticleTag>;
export type ArticleCategoryFromList = z.infer<typeof $ArticleCategoryFromList>;
export type ArticleWithMeta = z.infer<typeof $ArticleWithMeta>;

//FILTERS
export type ArticleFiltersForm = z.infer<typeof $ArticleFiltersForm>;
export type ArticleAndArticleCategoryFiltersForm = z.infer<typeof $ArticleAndArticleCategoryFiltersForm>;

//REQ/RESP
export type GetArticlesRequest = z.infer<typeof $GetArticlesRequest>;
export type GetArticlesResponse = z.infer<typeof $GetArticlesResponse>;
export type GetArticleRequest = z.infer<typeof $GetArticleRequest>;
export type GetArticleResponse = z.infer<typeof $GetArticleResponse>;
export type GetArticleCategoriesRequest = z.infer<typeof $GetArticleCategoriesRequest>;
export type GetArticleCategoriesResponse = z.infer<typeof $GetArticleCategoriesResponse>;
export type GetArticlesFiltersResponse = z.infer<typeof $GetArticlesFiltersResponse>;
//rating
export type UpdateArticleRatingRequest = z.infer<typeof $UpdateArticleRatingRequest>;
export type UpdateArticleRatingResponse = z.infer<typeof $UpdateArticleRatingResponse>;
export type DeleteArticleRatingRequest = z.infer<typeof $DeleteArticleRatingRequest>;
export type DeleteArticleRatingResponse = z.infer<typeof $DeleteArticleRatingResponse>;
//favorite
export type GetFavoriteArticlesRequest = z.infer<typeof $GetFavoriteArticlesRequest>;
export type GetFavoriteArticlesResponse = z.infer<typeof $GetFavoriteArticlesResponse>;
export type GetFavoriteArticleRequest = z.infer<typeof $GetFavoriteArticleRequest>;
export type GetFavoriteArticleResponse = z.infer<typeof $GetFavoriteArticleResponse>;
export type UpdateArticleFavoriteStatusRequest = z.infer<typeof $UpdateArticleFavoriteStatusRequest>;
export type UpdateArticleFavoriteStatusResponse = z.infer<typeof $UpdateArticleFavoriteStatusResponse>;
export type GetFavoriteArticlesFiltersResponse = z.infer<typeof $GetFavoriteArticlesFiltersResponse>;
//my-article
export type GetMyArticlesRequest = z.infer<typeof $GetMyArticlesRequest>;
export type GetMyArticlesResponse = z.infer<typeof $GetMyArticlesResponse>;
export type GetMyArticleRequest = z.infer<typeof $GetMyArticleRequest>;
export type GetMyArticleResponse = z.infer<typeof $GetMyArticleResponse>;
export type GetMyArticlesFiltersResponse = z.infer<typeof $GetMyArticlesFiltersResponse>;

//by-category
export type GetArticleByCategoryRequest = z.infer<typeof $GetArticleByCategoryRequest>;
export type GetArticleByCategoryResponse = z.infer<typeof $GetArticleByCategoryResponse>;
//ARTICLES <---> COURSES USER
export type GetArticleByCourseRequest = z.infer<typeof $GetArticleByCourseRequest>;
export type GetArticleByCourseResponse = z.infer<typeof $GetArticleByCourseResponse>;
export type GetArticlesByCourseFiltersRequest = z.infer<typeof $GetArticlesByCourseFiltersRequest>;
export type GetArticlesByCourseFiltersResponse = z.infer<typeof $GetArticlesByCourseFiltersResponse>;

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

export const $GetAdminArticleRequest = z.object({
    id: z.string(),
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

export const $ArticleCategory = $AdminArticleCategory.merge(z.object({ id: z.number().nullable() }));
export const $ArticleSubCategory = $AdminArticleCategory;
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
    videos: $UploadedFile.array(),
    documents: $UploadedFile.array(),
    category: $ArticleCategory.nullable(),
    subcategories: $ArticleSubCategory.array(),
    tags: $ArticleTag.array(),
});

export const $ArticleWithMeta = z.object({
    data: $Article,
    meta: $ArticleMeta,
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

export const $GetArticlesResponse = $getPaginationResponseType($ArticleFromList);

export const $GetArticleRequest = z.object({
    id: z.string(),
});

export const $GetArticleResponse = $Article;

export const $ArticleAndArticleCategoryFiltersForm = z.object({
    query: z.string(),
    tags: z.array(z.string()),
    subcategoryIds: z.array(z.string()),
    categoryId: z.string().optional(),
});

export const $GetArticlesFiltersResponse = z.object({
    subcategories: z.array($ArticleCategory),
    tags: z.array($ArticleTag),
});

//rating
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

//favorite
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

export const $GetFavoriteArticlesResponse = $getPaginationResponseType($ArticleFromList);

export const $GetFavoriteArticleRequest = z.object({
    id: z.string(),
});

export const $GetFavoriteArticleResponse = $ArticleWithMeta;

export const $UpdateArticleFavoriteStatusRequest = z.object({
    id: z.string(),
    isFavorite: z.boolean(),
});

export const $UpdateArticleFavoriteStatusResponse = z.object({
    isFavorite: z.boolean(),
});

export const $GetFavoriteArticlesFiltersResponse = $GetArticlesFiltersResponse;

//my-articles
export const $MyArticlesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            tagIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            subcategoryIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $GetMyArticlesRequest = $getFiltersRequestType($MyArticlesRequest);

export const $GetMyArticlesResponse = $getPaginationResponseType($ArticleFromList);

export const $GetMyArticleRequest = z.object({
    id: z.string(),
});

export const $GetMyArticleResponse = $ArticleWithMeta;

export const $GetMyArticlesFiltersResponse = $GetArticlesFiltersResponse;

//articles-by-category
export const $ArticleCategoryFromList = $ArticleCategory.pick({ name: true }).extend({
    id: z.number().nullable(),
    articlesCount: z.number(),
});

export const $GetArticleCategoriesResponse = $getPaginationResponseType($ArticleCategoryFromList);

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

export const $GetArticleByCategoryRequest = z.object({
    id: z.string(),
    categoryId: z.string(),
});

export const $GetArticleByCategoryResponse = $ArticleWithMeta;

//ARTICLES <---> COURSES USER
export const $GetArticleByCourseRequest = z.object({
    id: z.string(),
    courseId: z.string(),
});

export const $GetArticleByCourseResponse = $ArticleWithMeta;

export const $GetArticlesByCourseFiltersRequest = z.object({
    courseId: z.string(),
});

export const $GetArticlesByCourseFiltersResponse = $GetArticlesFiltersResponse;
