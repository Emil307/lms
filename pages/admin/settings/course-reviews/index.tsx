import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseReviewsPage } from "@pages/admin/settings";

const Reviews: NextPageWithLayout = () => {
    return (
        <AdminPage title="Отзывы курсов">
            <CourseReviewsPage />
        </AdminPage>
    );
};

Reviews.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Reviews;
