import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MyFavoriteCoursesPage } from "@pages/myCourses";

const MyFavoriteCourses: NextPageWithLayout = () => {
    return <MyFavoriteCoursesPage />;
};

MyFavoriteCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};

export default MyFavoriteCourses;
