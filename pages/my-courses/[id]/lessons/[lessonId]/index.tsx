import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { LessonDetailsPage } from "@pages/lessons";

const LessonDetails: NextPageWithLayout = () => {
    return <LessonDetailsPage />;
};

LessonDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default LessonDetails;
