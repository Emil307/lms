import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateStaticReviewPage } from "@pages/admin/settings";

const UpdateStaticReview: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование отзыва">
            <UpdateStaticReviewPage />
        </AdminPage>
    );
};

UpdateStaticReview.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateStaticReview;
