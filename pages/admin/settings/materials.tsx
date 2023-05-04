import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { MaterialsPage } from "@pages/admin/settings";

const Materials: NextPageWithLayout = () => {
    return (
        <AdminPage title="Справочник материалов">
            <MaterialsPage />
        </AdminPage>
    );
};

Materials.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Materials;
