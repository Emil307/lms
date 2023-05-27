import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { CreateUserPage } from "@pages/admin/users";

const UserCreatePage: NextPageWithLayout = () => {
    return <CreateUserPage />;
};

UserCreatePage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UserCreatePage;
