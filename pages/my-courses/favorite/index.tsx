import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { FavoriteCoursesPage } from "@pages/my-courses";

const MyFavoriteCourses: NextPageWithLayout = () => {
    return <FavoriteCoursesPage />;
};

MyFavoriteCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};

export default MyFavoriteCourses;
