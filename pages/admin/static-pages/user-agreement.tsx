import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UserAgreementPage } from "@pages/admin/staticPages";
import { AdminPage } from "@components/AdminPage";

const UserAgreement: NextPageWithLayout = () => {
    return (
        <AdminPage title="Публичная оферта">
            <UserAgreementPage />
        </AdminPage>
    );
};

UserAgreement.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UserAgreement;
