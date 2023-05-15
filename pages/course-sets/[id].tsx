import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseSetDetailPage } from "@pages/courseSets";

const CourseSetDetail: NextPageWithLayout = () => {
    return <CourseSetDetailPage />;
};

CourseSetDetail.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseSetDetail;
