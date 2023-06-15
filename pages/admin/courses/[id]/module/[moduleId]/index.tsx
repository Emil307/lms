import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {CourseModuleDetailPage} from "@pages/admin/courses";

const CourseModuleDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Модуль учебного курса">
            <CourseModuleDetailPage />
        </AdminPage>
    );
};

CourseModuleDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseModuleDetail;