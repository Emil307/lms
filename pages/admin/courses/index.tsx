import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AdminCoursesList } from "@features/courses";

const AdminCourses: NextPageWithLayout = () => {
    return (
        <AdminPage title="Курсы">
            <AdminCoursesList />
        </AdminPage>
    );
};

AdminCourses.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminCourses;
