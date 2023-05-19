import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AboutPage } from "@pages/admin/staticPages";

const AdminPageAbout: NextPageWithLayout = () => {
    return <AboutPage />;
};

AdminPageAbout.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminPageAbout;
