import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { LessonListPage } from "@pages/admin/lessons";

const AdminGroups: NextPageWithLayout = () => {
    return (
        <AdminPage title="Уроки">
            <LessonListPage />
        </AdminPage>
    );
};

AdminGroups.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminGroups;