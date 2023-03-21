import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { UserList } from "src/features/users";
import { NextPageWithLayout } from "@shared/utils/types";

const AdminUsers: NextPageWithLayout = () => {
    return <UserList />;
};

AdminUsers.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminUsers;
