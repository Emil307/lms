import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { GroupDetailsPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const GroupDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки группы">
            <GroupDetailsPage />
        </AdminPage>
    );
};

GroupDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default GroupDetails;
