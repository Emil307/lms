import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import {CabinetPage} from "@pages/cabinet/CabinetPage";

const Cabinet: NextPageWithLayout = () => {
    return <CabinetPage />;
};

Cabinet.getLayout = function (page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};

export default Cabinet;