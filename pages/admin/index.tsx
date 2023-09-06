import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import {MainPage} from "@pages/admin/main";

const AdminMain: NextPageWithLayout = () => {
    return (
        <AdminPage title="Приветствие">
            <MainPage />
        </AdminPage>
    );
};

AdminMain.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminMain;