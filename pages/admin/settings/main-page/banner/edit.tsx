import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateMainBannerPage } from "@pages/admin/settings";

const UpdateMainBanner: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование главного банера">
            <UpdateMainBannerPage />
        </AdminPage>
    );
};

UpdateMainBanner.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateMainBanner;
