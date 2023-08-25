import React from "react";
import { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ForgotPasswordForm } from "@features/auth";
import { UserPage } from "@components/UserPage";

const ForgotPassword: NextPageWithLayout = () => {
    return (
        <UserPage title="Забыли пароль">
            <ForgotPasswordForm />
        </UserPage>
    );
};

ForgotPassword.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default ForgotPassword;
