import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleCategoryPage } from "@pages/article-collection";

const ArticleCategory: NextPageWithLayout = () => {
    return <ArticleCategoryPage />;
};

ArticleCategory.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCategory;
