import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MyCoursesPage } from "@pages/my-courses";

const MyCourses: NextPageWithLayout = () => {
    return <MyCoursesPage />;
};

MyCourses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default MyCourses;
