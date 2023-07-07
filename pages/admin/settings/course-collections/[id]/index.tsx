import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseCollectionDetailsPage } from "@pages/admin/settings";

const CourseCollectionDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Страница подборки курсов">
            <CourseCollectionDetailsPage />
        </AdminPage>
    );
};

CourseCollectionDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CourseCollectionDetails;
