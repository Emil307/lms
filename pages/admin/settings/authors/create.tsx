import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AuthorCreatePage } from "@pages/admin/settings";

const AuthorCreate: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание автора">
            <AuthorCreatePage />
        </AdminPage>
    );
};

AuthorCreate.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AuthorCreate;
