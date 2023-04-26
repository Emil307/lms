import { Box } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { ContentPanel, MainInfoPanel } from "@widgets/article";
import { GetArticleDetailResponse } from "@entities/article";
import { getBreadCrumbsItems } from "./utils";

//TODO: Удалить после подключения эндпоинта
const mockDataResponse: GetArticleDetailResponse = {
    data: {
        id: 2,
        name: "some Title",
        content: "some content",
        category: "categoryName",
        subcategory: "subCategoryName",
        likesCount: 2,
        dislikesCount: 0,
        isFavorite: true,
        videos: {
            data: [
                {
                    id: 213,
                    name: "sample-5s.mp4",
                    extension: "mp4",
                    size: 2848208,
                    absolutePath:
                        "https://api-bucket.addamant-work.ru/business-galery-public/videos/x1ZODp3aCwUxxYb9wzWjdHG0eBMw9HK1V7L7NEaS.mp4",
                },
            ],
        },
        documents: {
            data: [
                {
                    id: 1,
                    name: "Screenshot-11.png",
                    extension: "png",
                    size: 88107,
                    absolutePath:
                        "https://api-bucket.addamant-work.ru/business-galery-public/images/Xvk4PtByweMSpoOinOFYil8Lvi7KIQehF7FhQmCw.png",
                },
                {
                    id: 2,
                    name: "Screenshot-11.png",
                    extension: "png",
                    size: 88107,
                    absolutePath:
                        "https://api-bucket.addamant-work.ru/business-galery-public/images/Xvk4PtByweMSpoOinOFYil8Lvi7KIQehF7FhQmCw.png",
                },
            ],
        },
        tags: {
            data: [
                { id: 0, name: "finance", slug: "finance" },
                { id: 1, name: "tag1", slug: "tag1" },
                { id: 2, name: "tag2", slug: "tag2" },
                { id: 3, name: "tag3", slug: "tag3" },
                { id: 4, name: "tag4", slug: "tag4" },
                { id: 5, name: "tag5", slug: "tag5" },
                { id: 6, name: "tag6", slug: "tag6" },
                { id: 7, name: "tag7", slug: "tag7" },
                { id: 8, name: "tag8", slug: "tag8" },
                { id: 9, name: "tag9", slug: "tag9" },
                { id: 10, name: "tag10", slug: "tag10" },
            ],
        },
    },
    meta: {
        pagination: {
            count: 1,
            total: 3,
            perPage: 1,
            currentPage: 2,
            totalPages: 3,
            links: {
                previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
            },
        },
    },
};

const ArticleDetailPage = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* TODO: Поменять title и query при подключении нормального реального эндпоинта */}
            <BreadCrumbs items={getBreadCrumbsItems({ title: "Оптимизация управления финансами", articleId: "123" })} />
            <MainInfoPanel articleData={mockDataResponse} />
            <ContentPanel articleData={mockDataResponse} />
        </Box>
    );
};

export default ArticleDetailPage;
