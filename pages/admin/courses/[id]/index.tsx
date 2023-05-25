import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {CourseCreatePage} from "@pages/admin/courses";

const CourseDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Учебный курс">
            <CourseCreatePage />
        </AdminPage>
    );
};

CourseDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CourseDetail;