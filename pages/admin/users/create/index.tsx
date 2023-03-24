import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UserCreate } from "@pages/admin";

const AdminUsers: NextPageWithLayout = () => {
    return<UserCreate />
};

AdminUsers.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default AdminUsers;
