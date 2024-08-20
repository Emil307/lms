import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { StaticReviewsPage } from "@pages/admin/settings";

const Reviews: NextPageWithLayout = () => {
    return (
        <AdminPage title="Отзывы">
            <StaticReviewsPage />
        </AdminPage>
    );
};

Reviews.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Reviews;
