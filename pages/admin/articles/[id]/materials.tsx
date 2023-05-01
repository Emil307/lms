import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticleMaterialsPage } from "@pages/admin/articles";

const ArticleMaterials: NextPageWithLayout = () => {
    return (
        <AdminPage title="Материалы статьи">
            <ArticleMaterialsPage />
        </AdminPage>
    );
};

ArticleMaterials.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticleMaterials;
