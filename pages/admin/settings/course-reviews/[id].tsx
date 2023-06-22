import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseReviewDetailsPage } from "@pages/admin/settings";

const CourseReviewDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Отзыв">
            <CourseReviewDetailsPage />
        </AdminPage>
    );
};

CourseReviewDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseReviewDetails;
