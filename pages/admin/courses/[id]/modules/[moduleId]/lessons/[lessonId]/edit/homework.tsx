import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {UpdateLessonHomeworkPage} from "@pages/admin/lessons";

const UpdateHomework: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование задания">
            <UpdateLessonHomeworkPage />
        </AdminPage>
    );
};

UpdateHomework.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateHomework;