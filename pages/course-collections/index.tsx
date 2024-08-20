import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseCollectionsPage } from "@pages/courseCollections";
import { UserPage } from "@components/UserPage";

const CourseCollections: NextPageWithLayout = () => {
    const title = `Топовые подборки курсов ${new Date().getFullYear()}`;
    return (
        <UserPage title={title}>
            <CourseCollectionsPage />
        </UserPage>
    );
};

CourseCollections.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseCollections;
