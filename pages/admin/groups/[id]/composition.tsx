import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { GroupCompositionPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const GroupComposition: NextPageWithLayout = () => {
    return (
        <AdminPage title="Состав группы">
            <GroupCompositionPage />
        </AdminPage>
    );
};

GroupComposition.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default GroupComposition;
