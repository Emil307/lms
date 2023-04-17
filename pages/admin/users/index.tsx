import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { List as UserList } from "src/features/users";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";

const AdminUsers: NextPageWithLayout = () => {
    return (
        <AdminPage title="Пользователи">
            <UserList />
        </AdminPage>
    );
};

AdminUsers.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminUsers;
