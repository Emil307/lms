import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { GroupSchedulePage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const GroupSchedule: NextPageWithLayout = () => {
    return (
        <AdminPage title="Расписание группы">
            <GroupSchedulePage />
        </AdminPage>
    );
};

GroupSchedule.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default GroupSchedule;
