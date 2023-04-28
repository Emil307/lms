import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackagesPage } from "@pages/admin/settings";

const ArticlePackages: NextPageWithLayout = () => {
    return (
        <AdminPage title="Пакеты базы знаний">
            <ArticlePackagesPage />
        </AdminPage>
    );
};

ArticlePackages.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ArticlePackages;
