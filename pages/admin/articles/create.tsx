import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateArticlePage } from "@pages/admin/articles";

const CreateArticle: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание статьи">
            <CreateArticlePage />
        </AdminPage>
    );
};

CreateArticle.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateArticle;
