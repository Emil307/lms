import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AuthorsPage } from "@pages/admin/settings";

const Authors: NextPageWithLayout = () => {
    return (
        <AdminPage title="Авторы курсов">
            <AuthorsPage />
        </AdminPage>
    );
};

Authors.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Authors;
