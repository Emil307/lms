import { z } from "zod";
import { $pagination } from "@shared/types";
import { $uploadedFile } from "@shared/ui";

export type Article = z.infer<typeof $article>;
export type ArticlePackageDiscount = z.infer<typeof $articlePackageDiscount>;
export type ArticleCategory = z.infer<typeof $articleCategory>;
export type ArticlePackage = z.infer<typeof $articlePackage>;
export type ArticleFilter = z.infer<typeof $articleFilter>;
export type ArticleCourse = z.infer<typeof $articleCourse>;

export type ArticleCategoryFilters = z.infer<typeof $articleCategoryFilters>;
export type GetArticlesResponse = z.infer<typeof $getArticlesResponse>;
export type GetArticlePackagesResponse = z.infer<typeof $getArticlePackagesResponse>;
export type GetArticleCategoriesResponse = z.infer<typeof $getArticleCategoriesResponse>;
export type GetArticleFiltersResponse = z.infer<typeof $getArticleFiltersResponse>;
export type GetArticleCoursesResponse = z.infer<typeof $getArticleCoursesResponse>;
export type GetArticleDetailResponse = z.infer<typeof $getArticleDetailResponse>;

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
    articleCount: z.number(),
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

//TODO: Объединить с дисконтами из других сущностей
export const $articlePackageDiscount = z.object({
    data: z
        .object({
            is_active: z.boolean(),
            type: z.string(),
            value: z.number(),
            from: z.string().datetime().nullable(),
            to: z.string().datetime().nullable(),
        })
        .nullable()
        .or(
            z.array(
                z.object({
                    is_active: z.boolean(),
                    type: z.string(),
                    value: z.number(),
                    from: z.string().datetime().nullable(),
                    to: z.string().datetime().nullable(),
                })
            )
        ),
});

export const $articlePackage = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    categories: z.object({
        data: z.array($articleCategory),
    }),

    isDiscount: z.boolean(),
    discount: $articlePackageDiscount,
    totalArticles: z.number(),
    price: z.number(),
});

export const $getArticlePackagesResponse = z.object({
    data: z.array($articlePackage),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $getArticlesResponse = z.object({
    data: z.array($article),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $articleCategoryFilters = z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    subCategories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
});

export const $getArticleCategoriesResponse = z.object({
    data: z.array($articleCategory),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $getArticleCoursesResponse = z.object({
    data: z.array($articleCourse),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $getArticleFiltersResponse = z.object({
    categories: z.object({
        data: z.array($articleFilter),
        meta: z.object({
            pagination: $pagination,
        }),
    }),
    tags: z.object({
        data: z.array($articleFilter),
        meta: z.object({
            pagination: $pagination,
        }),
    }),
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
