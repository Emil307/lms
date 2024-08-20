import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { LessonListPage } from "@pages/admin/lessons";

const Lessons: NextPageWithLayout = () => {
    return (
        <AdminPage title="Уроки">
            <LessonListPage />
        </AdminPage>
    );
};

Lessons.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Lessons;
