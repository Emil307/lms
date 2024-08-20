import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { SupportPage } from "@pages/support";
import { UserPage } from "@components/UserPage";

const Support: NextPageWithLayout = () => {
    return (
        <UserPage title="Поддержка">
            <SupportPage />
        </UserPage>
    );
};

Support.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Support;
