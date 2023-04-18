import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleDetailPage } from "@pages/article-collection";

const ArticleDetail: NextPageWithLayout = () => {
    return <ArticleDetailPage />;
};

ArticleDetail.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleDetail;
