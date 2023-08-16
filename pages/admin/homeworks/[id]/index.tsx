import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { HomeworkDetailsPage } from "@pages/admin/lessons";

const HomeworkDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Домашнее задание">
            <HomeworkDetailsPage />
        </AdminPage>
    );
};

HomeworkDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default HomeworkDetails;
