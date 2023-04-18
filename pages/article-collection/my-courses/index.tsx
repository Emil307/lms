import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleCollectionCoursesPage } from "@pages/article-collection";

const ArticleCollectionCourses: NextPageWithLayout = () => {
    return <ArticleCollectionCoursesPage />;
};

ArticleCollectionCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleCollectionCourses;
