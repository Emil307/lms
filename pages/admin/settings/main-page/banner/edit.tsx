import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { MainBannerEditPage } from "@pages/admin/settings";

const BannerEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование главного банера">
            <MainBannerEditPage />
        </AdminPage>
    );
};

BannerEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default BannerEdit;
