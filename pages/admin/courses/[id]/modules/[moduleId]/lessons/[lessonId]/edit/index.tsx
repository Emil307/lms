import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {UpdateLessonPage} from "@pages/admin/lessons";

const UpdateLesson: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование урока">
            <UpdateLessonPage />
        </AdminPage>
    );
};

UpdateLesson.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateLesson;