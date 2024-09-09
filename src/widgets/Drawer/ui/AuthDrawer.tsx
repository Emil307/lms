import React, { useEffect, useMemo, useState } from "react";
import { Drawer } from "@mantine/core";
import { useRouter } from "next/router";
import { Heading } from "@shared/ui";
import { AuthForm, ForgotPasswordForm, RecoveryPasswordForm, SignUpForm } from "@features/auth";
import { useSession } from "@entities/auth";
import { useMedia } from "@shared/utils";
import useStyles from "./AuthDrawer.styles";
const actionMapper: Record<string, { children: React.ReactNode; title: string } | undefined> = {
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

function AuthDrawer() {
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);
    const router = useRouter();
    const { user, isFetchingUser } = useSession();
    const { classes } = useStyles();

    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);
    useEffect(() => {
        if (!user) return;
        const { action, ...restQuery } = router.query;
        router.replace(
            {
                pathname: router.pathname,
                query: restQuery,
            },
            undefined,
            { shallow: true }
        );
    }, [user]);

    const isTablet = useMedia("md");

    const { children, title } = useMemo(() => {
        const action = router.query.action as string;
        return actionMapper[action] || { children: null, title: "" };
    }, [router.query.action]);

    if (!initialRenderComplete || isFetchingUser) {
        return <></>;
    }

    if (user) {
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
            position={isTablet ? "bottom" : "right"}
            size={isTablet ? "100%" : "450px"}
            zIndex={400}
            padding={4}
            classNames={classes}
            title={
                <Heading order={3} ta="center">
                    {title}
                </Heading>
            }>
            {children}
        </Drawer>
    );
}

export default AuthDrawer;
