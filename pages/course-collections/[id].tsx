import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseCollectionDetailsPage } from "@pages/courseCollections";

const CourseCollectionDetails: NextPageWithLayout = () => {
    return <CourseCollectionDetailsPage />;
};

CourseCollectionDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseCollectionDetails;
