import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MyArticleDetailsPage } from "@pages/articles";

const MyArticleDetails: NextPageWithLayout = () => {
    return <MyArticleDetailsPage />;
};

MyArticleDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default MyArticleDetails;
