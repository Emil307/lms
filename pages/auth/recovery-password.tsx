import React, { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { RecoveryPasswordForm } from "@features/auth";
import { UserPage } from "@components/UserPage";

const RecoveryPassword: NextPageWithLayout = () => {
    return (
        <UserPage title="Восстановление пароля">
            <RecoveryPasswordForm />
        </UserPage>
    );
};

RecoveryPassword.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default RecoveryPassword;
