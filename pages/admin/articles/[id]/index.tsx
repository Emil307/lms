import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { ArticleDetailsPage } from "@pages/admin/articles";

const ArticleDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Детали статьи">
            <ArticleDetailsPage />
        </AdminPage>
    );
};

ArticleDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default ArticleDetails;
