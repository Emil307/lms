import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateStaticReviewPage } from "@pages/admin/settings";

const CreateStaticReview: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание отзыва">
            <CreateStaticReviewPage />
        </AdminPage>
    );
};

CreateStaticReview.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CreateStaticReview;
