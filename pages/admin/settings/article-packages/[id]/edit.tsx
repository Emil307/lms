import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackageEditPage } from "@pages/admin/settings";

const ArticlePackageEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование пакета">
            <ArticlePackageEditPage />
        </AdminPage>
    );
};

ArticlePackageEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticlePackageEdit;
