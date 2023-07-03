import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { FavoriteArticleDetailsPage } from "@pages/articles";

const FavoriteArticleDetails: NextPageWithLayout = () => {
    return <FavoriteArticleDetailsPage />;
};

FavoriteArticleDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default FavoriteArticleDetails;
