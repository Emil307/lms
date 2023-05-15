import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseSetsPage } from "@pages/courseSets";

const CourseSets: NextPageWithLayout = () => {
    return <CourseSetsPage />;
};

CourseSets.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseSets;
