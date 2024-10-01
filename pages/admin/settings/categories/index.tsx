import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CategoriesPage } from "@pages/admin/settings";

const Categories: NextPageWithLayout = () => {
    return (
        <AdminPage title="Категории">
            <CategoriesPage />
        </AdminPage>
    );
};

Categories.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Categories;
