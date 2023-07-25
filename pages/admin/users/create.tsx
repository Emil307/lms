import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { CreateUserPage } from "@pages/admin/users";

const CreateUser: NextPageWithLayout = () => {
    return <CreateUserPage />;
};

CreateUser.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateUser;
