import React from "react";
import { ReactElement } from "react";
import { AuthLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { SignUpForm } from "@features/auth";

const SignUp: NextPageWithLayout = () => {
    return <SignUpForm />;
};

SignUp.getLayout = function (page: ReactElement) {
    return <AuthLayout>{page} </AuthLayout>;
};

export default SignUp;
