import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleByCategoryDetailsPage } from "@pages/articles";

const ArticleByCategoryDetails: NextPageWithLayout = () => {
    return <ArticleByCategoryDetailsPage />;
};

ArticleByCategoryDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleByCategoryDetails;
