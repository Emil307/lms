import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import MainPage from "@pages/main";

const Main: NextPageWithLayout = () => {
    return <MainPage />;
};

Main.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Main;
