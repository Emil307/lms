import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { AboutPage } from "@pages/staticPages";
import { UserPage } from "@components/UserPage";

const About: NextPageWithLayout = () => {
    return (
        <UserPage title="О проекте">
            <AboutPage />
        </UserPage>
    );
};

About.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default About;
