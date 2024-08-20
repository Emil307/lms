import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CabinetPage } from "@pages/cabinet/CabinetPage";
import { UserPage } from "@components/UserPage";

const Cabinet: NextPageWithLayout = () => {
    return (
        <UserPage title="Мой профиль">
            <CabinetPage />
        </UserPage>
    );
};

Cabinet.getLayout = function (page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
};

export default Cabinet;
