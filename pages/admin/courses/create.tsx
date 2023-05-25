import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {CourseCreatePage} from "@pages/admin/courses";

const CourseCreate: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание курса">
            <CourseCreatePage />
        </AdminPage>
    );
};

CourseCreate.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CourseCreate;
