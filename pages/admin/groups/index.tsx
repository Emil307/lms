import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AdminList as AdminGroupList } from "@features/groups";

const Groups: NextPageWithLayout = () => {
    return (
        <AdminPage title="Группы">
            <AdminGroupList />
        </AdminPage>
    );
};

Groups.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Groups;
