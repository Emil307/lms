import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {UpdateCoursePage} from "@pages/admin/courses";

const UpdateLesson: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование урока">
            <UpdateCoursePage />
        </AdminPage>
    );
};

UpdateLesson.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateLesson;