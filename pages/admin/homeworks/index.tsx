import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { HomeworkListPage } from "@pages/admin/lessons";

const Homeworks: NextPageWithLayout = () => {
    return (
        <AdminPage title="Домашние задания">
            <HomeworkListPage />
        </AdminPage>
    );
};

Homeworks.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Homeworks;
