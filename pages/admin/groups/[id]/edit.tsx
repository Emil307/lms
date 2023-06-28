import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UpdateGroupPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const UpdateGroup: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование группы">
            <UpdateGroupPage />
        </AdminPage>
    );
};

UpdateGroup.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateGroup;
