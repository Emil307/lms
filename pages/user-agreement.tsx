import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { UserAgreementPage } from "@pages/staticPages";
import { UserPage } from "@components/UserPage";

const UserAgreement: NextPageWithLayout = () => {
    return (
        <UserPage title="Пользовательское соглашение">
            <UserAgreementPage />
        </UserPage>
    );
};

UserAgreement.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default UserAgreement;
