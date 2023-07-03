import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CategoryDetailsPage } from "@pages/admin/settings";

const CategoryDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Подкатегории">
            <CategoryDetailsPage />
        </AdminPage>
    );
};

CategoryDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CategoryDetails;
