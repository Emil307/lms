import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticleEditPage } from "@pages/admin/articles";

const ArticleEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование статьи">
            <ArticleEditPage />
        </AdminPage>
    );
};

ArticleEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticleEdit;
