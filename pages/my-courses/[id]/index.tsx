import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { MyCourseDetailsPage } from "@pages/myCourses";

const MyCourseDetails: NextPageWithLayout = () => {
    return <MyCourseDetailsPage />;
};

MyCourseDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default MyCourseDetails;
