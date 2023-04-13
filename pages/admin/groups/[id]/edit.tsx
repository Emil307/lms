import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { GroupEditPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const GroupEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование группы">
            <GroupEditPage />
        </AdminPage>
    );
};

GroupEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default GroupEdit;