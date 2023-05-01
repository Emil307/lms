import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticleCreatePage } from "@pages/admin/articles";

const ArticleCreate: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание статьи">
            <ArticleCreatePage />
        </AdminPage>
    );
};

ArticleCreate.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticleCreate;
