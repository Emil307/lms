import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackageCreatePage } from "@pages/admin/settings";

const ArticlePackageCreate: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание пакета">
            <ArticlePackageCreatePage />
        </AdminPage>
    );
};

ArticlePackageCreate.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticlePackageCreate;
