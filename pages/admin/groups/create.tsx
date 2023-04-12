import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { GroupCreatePage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const GroupCreate: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание группы">
            <GroupCreatePage />
        </AdminPage>
    );
};

GroupCreate.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default GroupCreate;
