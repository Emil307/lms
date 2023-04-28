import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackageArticlesPage } from "@pages/admin/settings";

const ArticlePackageArticles: NextPageWithLayout = () => {
    return (
        <AdminPage title="Статьи пакета">
            <ArticlePackageArticlesPage />
        </AdminPage>
    );
};

ArticlePackageArticles.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticlePackageArticles;
