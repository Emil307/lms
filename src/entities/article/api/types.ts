import { z } from "zod";
import { $uploadedFile } from "@shared/ui";
import { $getPaginationResponseType, $pagination, TRequestFilterParams } from "@shared/types";

export type Article = z.infer<typeof $article>;
export type ArticlePackageDiscount = z.infer<typeof $articlePackageDiscount>;
export type ArticleCategory = z.infer<typeof $articleCategory>;
export type ArticlePackage = z.infer<typeof $articlePackage>;
export type ArticleFilter = z.infer<typeof $articleFilter>;
export type ArticleCourse = z.infer<typeof $articleCourse>;
export type ArticleFromArticlePackage = z.infer<typeof $articleFromArticlePackage>;

export type AdminArticle = z.infer<typeof $adminArticle>;
export type AdminArticleDetails = z.infer<typeof $adminArticleDetails>;
export type ResourceOption = z.infer<typeof $resourceOption>;
export type AdminArticleMaterial = z.infer<typeof $adminArticleMaterial>;

export type AdminArticlesFilters = z.infer<typeof $adminArticlesFilters>;
export type AdminArticleMaterialsFilters = z.infer<typeof $adminArticleMaterialsFilters>;

export type ArticleCategoryFilters = z.infer<typeof $articleCategoryFilters>;
export type GetArticlesResponse = z.infer<typeof $getArticlesResponse>;
export type GetArticlePackagesResponse = z.infer<typeof $getArticlePackagesResponse>;
export type GetArticleCategoriesResponse = z.infer<typeof $getArticleCategoriesResponse>;
export type GetArticleFiltersResponse = z.infer<typeof $getArticleFiltersResponse>;
export type GetArticleCoursesResponse = z.infer<typeof $getArticleCoursesResponse>;
export type GetArticleDetailResponse = z.infer<typeof $getArticleDetailResponse>;
export type GetArticlesFromArticlePackage = z.infer<typeof $getArticlesFromArticlePackage>;

export type CreateArticleRequest = z.infer<typeof $createArticleRequest>;
export type UpdateArticleRequest = z.infer<typeof $updateArticleRequest>;
export type GetAdminArticlesResponse = z.infer<typeof $getAdminArticlesResponse>;
export type GetAdminArticlesRequest = TRequestFilterParams<AdminArticlesFilters>;
export type GetAdminArticlesResourceResponse = z.infer<typeof $getAdminArticlesResourceResponse>;
export type GetAdminArticleMaterialsRequest = TRequestFilterParams<AdminArticleMaterialsFilters>;
export type GetAdminArticleMaterialsResponse = z.infer<typeof $getAdminArticleMaterialsResponse>;
export type DeleteAdminArticleMaterialRequest = z.infer<typeof $deleteAdminArticleMaterialRequest>;

export const $article = z.object({
    id: z.number(),
    name: z.string(),
    likes: z.number(),
    dislikes: z.number(),
    isAvailable: z.boolean(),
    isFavorite: z.boolean(),
});

export const $articleCategory = z.object({
    id: z.number(),
    name: z.string(),
    articlesCount: z.number(),
});

export const $articleCourse = z.object({
    id: z.number(),
    name: z.string(),
    articleCount: z.number(),
});

export const $articleFilter = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

export const $articleFromArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
});

//TODO: Объединить с дисконтами из других сущностей
export const $articlePackageDiscount = z.object({
    data: z.object({
        type: z.literal("percentage").or(z.literal("currency")),
        amount: z.number(),
        startingDate: z.coerce.date().nullable(),
        finishingDate: z.coerce.date().nullable(),
    }),
});

export const $articlePackage = z.object({
    id: z.number(),
    name: z.string(),
    articlesCount: z.number(),
    price: z.number(),
    discountPrice: z.number().nullable(),
    categories: z.object({
        data: z.array($articleCategory),
    }),
    discount: $articlePackageDiscount.nullable(),
});

export const $getArticlePackagesResponse = $getPaginationResponseType($articlePackage);

export const $getArticlesResponse = $getPaginationResponseType($article);

export const $articleCategoryFilters = z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    subCategories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
});

export const $getArticleCategoriesResponse = $getPaginationResponseType($articleCategory);

export const $getArticleCoursesResponse = $getPaginationResponseType($articleCourse);

export const $getArticleFiltersResponse = z.object({
    categories: $getPaginationResponseType($articleFilter),
    tags: $getPaginationResponseType($articleFilter),
});

//TODO: Это ооочень примерно так как даже на текущий момент и моковских эндпоинтов нет
export const $getArticleDetailResponse = z.object({
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
            data: z.array($uploadedFile),
        }),
        documents: z.object({
            data: z.array($uploadedFile),
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

export const $adminArticlesFilters = z.object({
    query: z.string(),
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    categoryId: z.string(),
    subcategoryId: z.string(),
    courseId: z.string(),
});

export const $adminArticleMaterialsFilters = z.object({
    articleId: z.string(),
});

export const $adminArticle = z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    subcategory: z.string(),
    courses: z.array(z.string()),
    isActive: z.boolean(),
});

export const $adminArticleDetails = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    category: z.string(),
    subcategory: z.string(),
    isActive: z.boolean(),
    likesCount: z.number(),
    dislikesCount: z.number(),
    //TODO: Обновить на camelCase посл е того как бек исправит это
    updated_at: z.coerce.date(),
    created_at: z.coerce.date(),
    //TODO: Обновить структуру после фиксов со стороны бека
    tags: z.object({
        data: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        ),
    }),
});

export const $adminArticleMaterial = z.object({
    id: z.number(),
    name: z.string(),
    size: z.number(),
    isActive: z.boolean(),
});

export const $createArticleRequest = z.object({
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

export const $updateArticleRequest = $createArticleRequest;

export const $getAdminArticlesResponse = $getPaginationResponseType($adminArticle);

export const $resourceOption = z.object({
    id: z.number(),
    name: z.string(),
});

export const $getAdminArticlesResourceResponse = z.object({
    categories: $getPaginationResponseType($resourceOption),
    subcategories: $getPaginationResponseType($resourceOption),
    courses: $getPaginationResponseType($resourceOption),
    tags: $getPaginationResponseType($resourceOption),
});

export const $getAdminArticleMaterialsResponse = $getPaginationResponseType($adminArticleMaterial);

export const $deleteAdminArticleMaterialRequest = z.object({
    articleId: z.string(),
    materialId: z.number(),
});
export const $getArticlesFromArticlePackage = $getPaginationResponseType($articleFromArticlePackage);
