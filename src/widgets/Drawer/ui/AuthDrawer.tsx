import React, { useEffect, useMemo, useState } from "react";
import { Drawer } from "@mantine/core";
import { useRouter } from "next/router";
import { Heading } from "@shared/ui";
import { AuthForm, ForgotPasswordForm, RecoveryPasswordForm, SignUpForm } from "@features/auth";
import { useSession } from "@entities/auth";
import useStyles from "./AuthDrawer.styles";
import { useMedia } from "@shared/utils";

function AuthDrawer() {
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);
    const router = useRouter();
    const { user, isFetchingUser } = useSession();
    const { classes } = useStyles();

    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);
    const isTablet = useMedia("sm");

    const actionMapper: Record<string, { children: React.ReactNode; title: string }> = {
        auth: {
            children: <AuthForm />,
            title: "Вход в личный кабинет",
        },
        "sign-up": {
            children: <SignUpForm />,
            title: "Регистрация",
        },
        "forgot-password": {
            children: <ForgotPasswordForm />,
            title: "Забыли пароль?",
        },
        "recovery-password": {
            children: <RecoveryPasswordForm />,
            title: "Восстановление пароля",
        },
    };

    const { children, title } = useMemo(() => {
        const action = router.query.action as string;
        return actionMapper[action] || { children: null, title: "" };
    }, [router.query.action]);

    if (!initialRenderComplete || isFetchingUser) {
        return <></>;
    }
    if (user) {
        const { action, ...restQuery } = router.query;
        router.replace(
            {
                pathname: router.pathname,
                query: restQuery,
            },
            undefined,
            { shallow: true }
        );
        return <></>;
    }

    const opened = Boolean(router.query.action);

    return (
        <Drawer
            opened={opened}
            onClose={() => {
                const { action, ...restQuery } = router.query;
                router.replace(
                    {
                        pathname: router.pathname,
                        query: restQuery,
                    },
                    undefined,
                    { shallow: true }
                );
            }}
            position="right"
            size={isTablet ? "100%" : "450px"}
            zIndex={400}
            padding={4}
            classNames={classes}
            title={
                <Heading order={3} ta="center" pt={12}>
                    {title}
                </Heading>
            }>
            {children}
        </Drawer>
    );
}

export default AuthDrawer;
