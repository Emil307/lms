import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticlesPage } from "@pages/articles";

const ArticleCollection: NextPageWithLayout = () => {
    return <ArticlesPage />;
};

ArticleCollection.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCollection;
