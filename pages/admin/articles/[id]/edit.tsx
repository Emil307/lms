import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateArticlePage } from "@pages/admin/articles";

const UpdateArticle: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование статьи">
            <UpdateArticlePage />
        </AdminPage>
    );
};

UpdateArticle.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateArticle;
