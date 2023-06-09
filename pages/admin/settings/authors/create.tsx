import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateAuthorPage } from "@pages/admin/settings";

const CreateAuthor: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание автора">
            <CreateAuthorPage />
        </AdminPage>
    );
};

CreateAuthor.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateAuthor;
