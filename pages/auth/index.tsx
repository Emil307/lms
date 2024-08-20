import React, { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { AuthForm } from "@features/auth";
import { UserPage } from "@components/UserPage";

const Auth: NextPageWithLayout = () => {
    return (
        <UserPage title="Вход в систему">
            <AuthForm />
        </UserPage>
    );
};

Auth.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default Auth;
