import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleCollectionFavoritePage } from "@pages/article-collection";

const ArticleCollectionFavorite: NextPageWithLayout = () => {
    return <ArticleCollectionFavoritePage />;
};

ArticleCollectionFavorite.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCollectionFavorite;
