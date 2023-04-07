import React from "react";
import { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ForgotPasswordForm } from "@features/auth";

const ForgotPassword: NextPageWithLayout = () => {
    return <ForgotPasswordForm />;
};

ForgotPassword.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default ForgotPassword;
