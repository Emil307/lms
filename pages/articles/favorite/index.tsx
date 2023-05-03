import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleFavoritePage } from "@pages/articles";

const ArticleFavorite: NextPageWithLayout = () => {
    return <ArticleFavoritePage />;
};

ArticleFavorite.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleFavorite;
