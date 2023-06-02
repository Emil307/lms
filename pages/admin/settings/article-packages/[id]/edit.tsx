import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateArticlePackagePage } from "@pages/admin/settings";

const UpdateArticlePackage: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование пакета">
            <UpdateArticlePackagePage />
        </AdminPage>
    );
};

UpdateArticlePackage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateArticlePackage;
