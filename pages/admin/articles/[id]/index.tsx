import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticleDetailPage } from "@pages/admin/articles";

const ArticleDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Детали статьи">
            <ArticleDetailPage />
        </AdminPage>
    );
};

ArticleDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticleDetail;
