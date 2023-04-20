import React from "react";
import { ReactElement } from "react";
import { UserDetail } from "@pages/admin/users";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";

const AdminUsers: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки пользователя">
            <UserDetail />
        </AdminPage>
    );
};

AdminUsers.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminUsers;
