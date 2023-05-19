import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateStaticReviewPage } from "@pages/admin/settings";

const UpdateReview: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование отзыва">
            <UpdateStaticReviewPage />
        </AdminPage>
    );
};

UpdateReview.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateReview;
