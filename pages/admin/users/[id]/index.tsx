import React from "react";
import { ReactElement } from "react";
import { UserDetailsPage } from "@pages/admin/users";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";

const UserDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки пользователя">
            <UserDetailsPage />
        </AdminPage>
    );
};

UserDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UserDetails;
