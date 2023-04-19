import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { AdvantagesPage } from "@pages/admin/settings";

const Advantages: NextPageWithLayout = () => {
    return (
        <AdminPage title="Преимущества">
            <AdvantagesPage />
        </AdminPage>
    );
};

Advantages.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Advantages;
