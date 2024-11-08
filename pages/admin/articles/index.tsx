import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlesPage } from "@pages/admin/articles";

const Articles: NextPageWithLayout = () => {
    return (
        <AdminPage title="База знаний">
            <ArticlesPage />
        </AdminPage>
    );
};

Articles.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Articles;
