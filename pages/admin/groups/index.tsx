import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { GroupsPage } from "@pages/admin/groups";

const Groups: NextPageWithLayout = () => {
    return (
        <AdminPage title="Группы">
            <GroupsPage />
        </AdminPage>
    );
};

Groups.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Groups;
