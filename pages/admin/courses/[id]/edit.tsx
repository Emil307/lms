import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {CourseEditPage} from "@pages/admin/courses";

const CourseEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование курса">
            <CourseEditPage />
        </AdminPage>
    );
};

CourseEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CourseEdit;