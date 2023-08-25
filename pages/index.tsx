import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MainPage } from "@pages/main";
import { UserPage } from "@components/UserPage";

const Main: NextPageWithLayout = () => {
    return (
        <UserPage>
            <MainPage />
        </UserPage>
    );
};

Main.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Main;
