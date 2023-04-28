import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackageDetailPage } from "@pages/admin/settings";

const ArticlePackageDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки пакета">
            <ArticlePackageDetailPage />
        </AdminPage>
    );
};

ArticlePackageDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticlePackageDetail;
