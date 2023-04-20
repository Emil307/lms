import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AuthorEditPage } from "@pages/admin/settings";

const AuthorEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование автора">
            <AuthorEditPage />
        </AdminPage>
    );
};

AuthorEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AuthorEdit;
