import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CoursePackageDetailPage } from "@pages/course-packages";

const CoursePackageDetail: NextPageWithLayout = () => {
    return <CoursePackageDetailPage />;
};

CoursePackageDetail.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CoursePackageDetail;
