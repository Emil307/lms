import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { SupportPage } from "@pages/support";

const Support: NextPageWithLayout = () => {
    return <SupportPage />;
};

Support.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Support;