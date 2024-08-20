import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { CreateGroupPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";

const CreateGroup: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание группы">
            <CreateGroupPage />
        </AdminPage>
    );
};

CreateGroup.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateGroup;
