import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseCollectionsPage } from "@pages/courseCollections";

const CourseCollections: NextPageWithLayout = () => {
    return <CourseCollectionsPage />;
};

CourseCollections.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseCollections;
