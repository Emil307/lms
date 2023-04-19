import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { EditStaticReviewPage } from "@pages/admin/settings";

const ReviewEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование отзыва">
            <EditStaticReviewPage />
        </AdminPage>
    );
};

ReviewEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default ReviewEdit;
