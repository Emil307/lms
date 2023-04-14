import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { TagsPage } from "@pages/admin/settings";

const TagsAdmin: NextPageWithLayout = () => {
    return (
        <AdminPage title="Теги">
            <TagsPage />
        </AdminPage>
    );
};

TagsAdmin.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default TagsAdmin;
