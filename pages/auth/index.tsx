import React from "react";
import { Stack } from "@mantine/core";
import { ForgotPasswordForm } from "@features/auth";

export const AuthPage = () => {
    return (
        <Stack p={40} style={{ border: "1px solid black", borderRadius: 16, maxWidth: 500, margin: "0 auto" }}>
            <ForgotPasswordForm />
        </Stack>
    );
};

export default AuthPage;
