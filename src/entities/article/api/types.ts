import { z } from "zod";
import {
    $LastUpdated,
    $UploadedFile,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
    TRequestFilterParams,
} from "@shared/types";

/**
 *
 * GENERAL TYPES
 *
 */

export type UserRating = z.infer<typeof $UserRating>;

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
export type AdminArticleMaterial = z.infer<typeof $AdminArticleMaterial>;

//FILTERS
export type AdminArticlesFiltersForm = z.infer<typeof $AdminArticlesFiltersForm>;
export type AdminArticleMaterialsFilters = z.infer<typeof $AdminArticleMaterialsFilters>;
export type AdminArticleFromArticlePackageFiltersForm = z.infer<typeof $AdminArticleFromArticlePackageFiltersForm>;
export type AdminArticleFromArticlePackageExtraFilters = z.infer<typeof $AdminArticleFromArticlePackageExtraFilters>;

//REQ/RESP
export type CreateArticleRequest = z.infer<typeof $CreateArticleRequest>;
export type CreateArticleResponse = z.infer<typeof $CreateArticleResponse>;
export type UpdateArticleRequest = z.infer<typeof $UpdateArticleRequest>;
export type UpdateArticleResponse = z.infer<typeof $UpdateArticleResponse>;
export type GetAdminArticlesResponse = z.infer<typeof $GetAdminArticlesResponse>;
export type GetAdminArticlesRequest = z.infer<typeof $GetAdminArticlesRequest>;
export type GetAdminArticlesResourceResponse = z.infer<typeof $GetAdminArticlesResourceResponse>;
export type GetAdminArticleMaterialsRequest = TRequestFilterParams<AdminArticleMaterialsFilters>;
export type GetAdminArticleMaterialsResponse = z.infer<typeof $GetAdminArticleMaterialsResponse>;
export type DeleteAdminArticleMaterialRequest = z.infer<typeof $DeleteAdminArticleMaterialRequest>;
export type UpdateArticleActivityRequest = z.infer<typeof $UpdateArticleActivityRequest>;
export type UpdateArticleActivityResponse = z.infer<typeof $UpdateArticleActivityResponse>;
export type GetAdminArticlesNoIncludedArticlePackageRequest = z.infer<typeof $GetAdminArticlesNoIncludedArticlePackageRequest>;

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
export type ArticleCategoryFilters = z.infer<typeof $ArticleCategoryFilters>;

//REQ/RESP
export type GetArticleResponse = z.infer<typeof $GetArticleResponse>;
export type GetArticlesRequest = z.infer<typeof $GetArticlesRequest>;
export type GetArticlesResponse = z.infer<typeof $GetArticlesResponse>;
export type GetArticleCategoriesResponse = z.infer<typeof $GetArticleCategoriesResponse>;
export type GetArticleFiltersResponse = z.infer<typeof $GetArticleFiltersResponse>;
export type GetArticleCoursesResponse = z.infer<typeof $GetArticleCoursesResponse>;
export type GetAdminArticleFiltersResponse = z.infer<typeof $GetAdminArticleFiltersResponse>;
export type GetAdminArticleResourcesCreateResponse = z.infer<typeof $GetAdminArticleResourcesCreateResponse>;

/**
 *
 * GENERAL ZOD
 *
 */
export const $UserRating = z.literal("like").or(z.literal("dislike"));

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

export const $AdminArticleMaterialsFilters = z.object({
    articleId: z.string(),
});

export const $AdminArticle = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    isActive: z.boolean(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    likesCount: z.number(),
    dislikesCount: z.number(),
    category: $AdminArticleCategory,
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

export const $AdminArticleMaterial = z.object({
    id: z.number(),
    name: z.string(),
    size: z.number(),
    isActive: z.boolean(),
});

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
    subcategories: z.coerce.number().array().min(1, "Выберите подкатегорию"),
    tags: z.array(z.coerce.number()).optional(),
});

export const $CreateArticleResponse = $AdminArticle;

export const $UpdateArticleRequest = $CreateArticleRequest.extend({
    id: z.string(),
});

export const $UpdateArticleResponse = $AdminArticle;

export const $GetAdminArticlesResponse = $getPaginationResponseType($AdminArticleFromList);

export const $GetAdminArticlesResourceResponse = z.object({
    categories: $getPaginationResponseType($AdminArticleCategory),
    subcategories: $getPaginationResponseType($AdminArticleCategory),
    courses: $getPaginationResponseType($AdminArticleCourse),
    tags: $getPaginationResponseType($AdminArticleTag),
});

export const $GetAdminArticleMaterialsResponse = $getPaginationResponseType($AdminArticleMaterial);

export const $DeleteAdminArticleMaterialRequest = z.object({
    articleId: z.string(),
    materialId: z.number(),
});

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
            "subcategory.id": z.string(),
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
    category: $ArticleCategory,
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
    categoryId: z.number(),
    articlePackageIds: z.number(),
});

export const $ArticlesRequest = z.object({
    filter: z
        .object({
            "category.id": z.number(),
            articlePackageIds: z.number(),
        })
        .partial(),
});

export const $GetArticleResponse = $Article;

export const $GetArticlesRequest = $getFiltersRequestType($ArticlesRequest);

export const $GetArticlesResponse = $getPaginationResponseType($ArticleFromList);

export const $ArticleCategoryFromList = $ArticleCategory.extend({
    articlesCount: z.number(),
});

export const $GetArticleCategoriesResponse = $getPaginationResponseType($ArticleCategoryFromList);

export const $ArticleCourse = z.object({
    id: z.number(),
    name: z.string(),
    articleCount: z.number(),
});

export const $ArticleCategoryFilters = z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    subcategories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
});

export const $ArticleCategoryFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryId: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    discountFinishingDate: z.coerce.date().nullable(),
});

export const $GetArticleCoursesResponse = $getPaginationResponseType($ArticleCourse);

export const $GetArticleFiltersResponse = z.object({
    subcategories: z.array($AdminArticleCategory),
    tags: z.array($AdminArticleTag),
});
