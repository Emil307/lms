import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {UpdateCoursePage} from "@pages/admin/courses";

const UpdateCourse: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование курса">
            <UpdateCoursePage />
        </AdminPage>
    );
};

UpdateCourse.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateCourse;