import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleCollectionPage } from "@pages/article-collection";

const ArticleCollection: NextPageWithLayout = () => {
    return <ArticleCollectionPage />;
};

ArticleCollection.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCollection;
