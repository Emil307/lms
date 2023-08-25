import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MyCoursesPage } from "@pages/myCourses";
import { UserPage } from "@components/UserPage";

const MyCourses: NextPageWithLayout = () => {
    return (
        <UserPage title="Мои курсы">
            <MyCoursesPage />
        </UserPage>
    );
};

MyCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default MyCourses;
