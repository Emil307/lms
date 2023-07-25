import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateUserPage } from "@pages/admin/users";

const UpdateUser: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование пользователя">
            <UpdateUserPage />
        </AdminPage>
    );
};

UpdateUser.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateUser;
