import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleCoursePage } from "@pages/articles";

const ArticleCourse: NextPageWithLayout = () => {
    return <ArticleCoursePage />;
};

ArticleCourse.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCourse;
