import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CoursesPage } from "@pages/courses";
import { UserPage } from "@components/UserPage";

const Courses: NextPageWithLayout = () => {
    return (
        <UserPage title="Курсы">
            <CoursesPage />
        </UserPage>
    );
};

Courses.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Courses;
