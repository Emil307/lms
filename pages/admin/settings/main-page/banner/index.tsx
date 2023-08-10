import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { MainBannerPage } from "@pages/admin/settings";

const MainBanner: NextPageWithLayout = () => {
    return (
        <AdminPage title="Главный баннер">
            <MainBannerPage />
        </AdminPage>
    );
};

MainBanner.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default MainBanner;
