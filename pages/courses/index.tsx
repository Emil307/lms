import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CoursesPage } from "@pages/courses";

const Courses: NextPageWithLayout = () => {
    return <CoursesPage />;
};

Courses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Courses;
