import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticlesPage } from "@pages/articles";

const Articles: NextPageWithLayout = () => {
    return <ArticlesPage />;
};

Articles.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Articles;
