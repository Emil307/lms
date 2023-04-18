import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { List as GroupList } from "@features/groups";

const AdminGroups: NextPageWithLayout = () => {
    return (
        <AdminPage title="Группы">
            <GroupList />
        </AdminPage>
    );
};

AdminGroups.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminGroups;
