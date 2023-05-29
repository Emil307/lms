import { z } from "zod";
import { $UploadedFile, $getPaginationResponseType, $pagination, TRequestFilterParams } from "@shared/types";

export type Article = z.infer<typeof $Article>;
export type ArticleCategory = z.infer<typeof $ArticleCategory>;
export type AdminArticleCategory = z.infer<typeof $AdminArticleCategory>;
export type AdminArticleTag = z.infer<typeof $AdminArticleTag>;
export type ArticleCourse = z.infer<typeof $ArticleCourse>;

export type AdminArticle = z.infer<typeof $AdminArticle>;
export type AdminArticleDetails = z.infer<typeof $AdminArticleDetails>;
export type ResourceOption = z.infer<typeof $ResourceOption>;
export type AdminArticleMaterial = z.infer<typeof $AdminArticleMaterial>;

export type AdminArticlesFilters = z.infer<typeof $AdminArticlesFilters>;
export type AdminArticleMaterialsFilters = z.infer<typeof $AdminArticleMaterialsFilters>;

export type ArticleCategoryFilters = z.infer<typeof $ArticleCategoryFilters>;
export type GetArticlesResponse = z.infer<typeof $GetArticlesResponse>;
export type GetArticleCategoriesResponse = z.infer<typeof $GetArticleCategoriesResponse>;
export type GetArticleFiltersResponse = z.infer<typeof $GetArticleFiltersResponse>;
export type GetArticleCoursesResponse = z.infer<typeof $GetArticleCoursesResponse>;
export type GetArticleDetailResponse = z.infer<typeof $GetArticleDetailResponse>;
export type CreateArticleRequest = z.infer<typeof $CreateArticleRequest>;
export type UpdateArticleRequest = z.infer<typeof $UpdateArticleRequest>;
export type GetAdminArticlesResponse = z.infer<typeof $GetAdminArticlesResponse>;
export type GetAdminArticlesRequest = TRequestFilterParams<AdminArticlesFilters>;
export type GetAdminArticlesResourceResponse = z.infer<typeof $GetAdminArticlesResourceResponse>;
export type GetAdminArticleMaterialsRequest = TRequestFilterParams<AdminArticleMaterialsFilters>;
export type GetAdminArticleMaterialsResponse = z.infer<typeof $GetAdminArticleMaterialsResponse>;
export type DeleteAdminArticleMaterialRequest = z.infer<typeof $DeleteAdminArticleMaterialRequest>;
export type UpdateArticleActivityRequest = z.infer<typeof $UpdateArticleActivityRequest>;
export type UpdateArticleActivityResponse = z.infer<typeof $UpdateArticleActivityResponse>;

export const $Article = z.object({
    id: z.number(),
    name: z.string(),
    likes: z.number(),
    dislikes: z.number(),
    isAvailable: z.boolean(),
    isFavorite: z.boolean(),
});

export const $ArticleCategory = z.object({
    id: z.number(),
    name: z.string(),
    articlesCount: z.number(),
});

export const $ArticleCourse = z.object({
    id: z.number(),
    name: z.string(),
    articleCount: z.number(),
});

export const $AdminArticleCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminArticleTag = $AdminArticleCategory;

export const $GetArticlesResponse = $getPaginationResponseType($Article);

export const $ArticleCategoryFilters = z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    subCategories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
});

export const $GetArticleCategoriesResponse = $getPaginationResponseType($ArticleCategory);

export const $GetArticleCoursesResponse = $getPaginationResponseType($ArticleCourse);

export const $GetArticleFiltersResponse = z.object({
    subcategories: z.array($AdminArticleCategory),
    tags: z.array($AdminArticleTag),
});

//TODO: Это ооочень примерно так как даже на текущий момент и моковских эндпоинтов нет
export const $GetArticleDetailResponse = z.object({
    data: z.object({
        id: z.number(),
        name: z.string(),
        content: z.string(),
        category: z.string(),
        subcategory: z.string(),
        likesCount: z.number(),
        dislikesCount: z.number(),
        isFavorite: z.boolean(),
        videos: z.object({
            data: z.array($UploadedFile),
        }),
        documents: z.object({
            data: z.array($UploadedFile),
        }),
        tags: z.object({
            data: z.array(z.object({ id: z.number(), name: z.string(), slug: z.string() })),
        }),
    }),
    meta: z.object({
        pagination: $pagination,
    }),
});

//
//
//TODO: Это то что уже с микроча
//

export const $AdminArticlesFilters = z.object({
    query: z.string(),
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    categoryId: z.string(),
    subcategoryId: z.string(),
    courseId: z.string(),
});

export const $AdminArticleMaterialsFilters = z.object({
    articleId: z.string(),
});

export const $AdminArticle = z.object({
    id: z.number(),
    name: z.string(),
    category: z.object({ name: z.string() }),
    subcategory: z.object({ name: z.string() }),
    courses: z.array(z.string()),
    isActive: z.boolean(),
});

export const $AdminArticleDetails = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    category: z.object({ id: z.number(), name: z.string() }),
    subcategory: z.object({ id: z.number(), name: z.string() }),
    isActive: z.boolean(),
    likesCount: z.number(),
    dislikesCount: z.number(),
    createdAt: z.coerce.date(),
    tags: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ),
});

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
    subcategoryId: z.coerce
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите подкатегорию",
        }),

    tags: z.array(z.coerce.number()).optional(),
});

export const $UpdateArticleRequest = $CreateArticleRequest;

export const $GetAdminArticlesResponse = $getPaginationResponseType($AdminArticle);

export const $ResourceOption = z.object({
    id: z.number(),
    name: z.string(),
});

export const $GetAdminArticlesResourceResponse = z.object({
    categories: $getPaginationResponseType($ResourceOption),
    subcategories: $getPaginationResponseType($ResourceOption),
    courses: $getPaginationResponseType($ResourceOption),
    tags: $getPaginationResponseType($ResourceOption),
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
