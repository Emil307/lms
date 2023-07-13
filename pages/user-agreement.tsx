import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { UserAgreementPage } from "@pages/staticPages";

const UserAgreement: NextPageWithLayout = () => {
    return <UserAgreementPage />;
};

UserAgreement.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default UserAgreement;
