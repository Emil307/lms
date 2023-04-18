import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CategoriesPage } from "@pages/admin/settings";

const CategoriesAdmin: NextPageWithLayout = () => {
    return (
        <AdminPage title="Категории курсов">
            <CategoriesPage />
        </AdminPage>
    );
};

CategoriesAdmin.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CategoriesAdmin;
