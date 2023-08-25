import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MyFavoriteCoursesPage } from "@pages/myCourses";
import { UserPage } from "@components/UserPage";

const MyFavoriteCourses: NextPageWithLayout = () => {
    return (
        <UserPage title="Избранные курсы">
            <MyFavoriteCoursesPage />
        </UserPage>
    );
};

MyFavoriteCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};

export default MyFavoriteCourses;
