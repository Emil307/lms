import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UserDetail } from "@pages/admin";

const AdminUsers: NextPageWithLayout = () => {
    return <UserDetail />
};

AdminUsers.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminUsers;
