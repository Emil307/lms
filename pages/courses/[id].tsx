import React from "react";
import { ReactElement } from "react";

import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseDetailPage } from "@pages/courses";

const CourseDetail: NextPageWithLayout = () => {
    return <CourseDetailPage />;
};

CourseDetail.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseDetail;
