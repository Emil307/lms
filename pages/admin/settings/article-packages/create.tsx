import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateArticlePackagePage } from "@pages/admin/settings";

const CreateArticlePackage: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание пакета">
            <CreateArticlePackagePage />
        </AdminPage>
    );
};

CreateArticlePackage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateArticlePackage;
