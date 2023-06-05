import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleDetailsPage } from "@pages/articles";

const ArticleDetails: NextPageWithLayout = () => {
    return <ArticleDetailsPage />;
};

ArticleDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleDetails;
