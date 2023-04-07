import React from "react";
import { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { AuthForm } from "@features/auth";

const Auth: NextPageWithLayout = () => {
    return <AuthForm />;
};

Auth.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default Auth;
