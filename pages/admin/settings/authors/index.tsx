import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AuthorsPage } from "@pages/admin/settings";

const AdminAuthors: NextPageWithLayout = () => {
    return (
        <AdminPage title="Авторы курсов">
            <AuthorsPage />
        </AdminPage>
    );
};

AdminAuthors.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminAuthors;
