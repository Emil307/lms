import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { HomeworkDetailPage } from "@pages/admin/lessons";

const HomeworkDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Домашнее задание">
            <HomeworkDetailPage />
        </AdminPage>
    );
};

HomeworkDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default HomeworkDetail;