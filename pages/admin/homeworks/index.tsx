import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";

const Homeworks: NextPageWithLayout = () => {
    return (
        <AdminPage title="Домашние задания">
        </AdminPage>
    );
};

Homeworks.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Homeworks;