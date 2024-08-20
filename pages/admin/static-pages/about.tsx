import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AboutPage } from "@pages/admin/staticPages";
import { AdminPage } from "@components/AdminPage";

const AdminPageAbout: NextPageWithLayout = () => {
    return (
        <AdminPage title="О проекте">
            <AboutPage />
        </AdminPage>
    );
};

AdminPageAbout.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminPageAbout;
