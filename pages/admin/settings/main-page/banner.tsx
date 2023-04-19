import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { MainBannerPage } from "@pages/admin/settings";

const SettingsMainPage: NextPageWithLayout = () => {
    return (
        <AdminPage title="Главный баннер">
            <MainBannerPage />
        </AdminPage>
    );
};

SettingsMainPage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default SettingsMainPage;
