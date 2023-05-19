import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UserAgreementPage } from "@pages/admin/staticPages";

const UserAgreement: NextPageWithLayout = () => {
    return <UserAgreementPage />;
};

UserAgreement.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UserAgreement;
