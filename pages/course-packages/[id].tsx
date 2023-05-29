import React from "react";
import { ReactElement } from "react";
import { CoursePackageDetailPage } from "@pages/coursePackages";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";

const CoursePackageDetail: NextPageWithLayout = () => {
    return <CoursePackageDetailPage />;
};

CoursePackageDetail.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CoursePackageDetail;
