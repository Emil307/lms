import React from "react";
import { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { RecoveryPasswordForm } from "@features/auth";

const RecoveryPassword: NextPageWithLayout = () => {
    return <RecoveryPasswordForm />;
};

RecoveryPassword.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default RecoveryPassword;
