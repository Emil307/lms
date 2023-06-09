import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateAuthorPage } from "@pages/admin/settings";

const UpdateAuthor: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование автора">
            <UpdateAuthorPage />
        </AdminPage>
    );
};

UpdateAuthor.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateAuthor;
