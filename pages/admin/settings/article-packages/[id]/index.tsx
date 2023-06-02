import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticlePackageDetailsPage } from "@pages/admin/settings";

const ArticlePackageDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Страница пакета статей">
            <ArticlePackageDetailsPage />
        </AdminPage>
    );
};

ArticlePackageDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticlePackageDetails;
