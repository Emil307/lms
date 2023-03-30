import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import AboutPage from "@pages/about";

const About: NextPageWithLayout = () => {
    return <AboutPage />;
};

About.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default About;
