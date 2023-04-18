import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CategoryPage } from "@pages/admin/settings";

const CategoryAdmin: NextPageWithLayout = () => {
    return (
        <AdminPage title="Подкатегории">
            <CategoryPage />
        </AdminPage>
    );
};

CategoryAdmin.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CategoryAdmin;
