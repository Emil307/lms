import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateLessonTestPage } from "@pages/admin/lessons";

const UpdateTest: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование теста">
            <UpdateLessonTestPage />
        </AdminPage>
    );
};

UpdateTest.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateTest;