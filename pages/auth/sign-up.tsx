import React, { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { SignUpForm } from "@features/auth";
import { UserPage } from "@components/UserPage";

const SignUp: NextPageWithLayout = () => {
    return (
        <UserPage title="Регистрация">
            <SignUpForm />
        </UserPage>
    );
};

SignUp.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default SignUp;
