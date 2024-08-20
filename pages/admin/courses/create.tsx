import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateCoursePage } from "@pages/admin/courses";

const CreateCourse: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание курса">
            <CreateCoursePage />
        </AdminPage>
    );
};

CreateCourse.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateCourse;
