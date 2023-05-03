import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleCoursesPage } from "@pages/articles";

const ArticleCourses: NextPageWithLayout = () => {
    return <ArticleCoursesPage />;
};

ArticleCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCourses;
