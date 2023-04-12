import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { GroupDetailPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const GroupDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки группы">
            <GroupDetailPage />
        </AdminPage>
    );
};

GroupDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default GroupDetail;
