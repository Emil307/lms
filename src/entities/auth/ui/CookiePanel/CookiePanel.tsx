import { Flex } from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { Button, Paragraph } from "@shared/ui";
import useStyles from "./CookiePanel.styles";
import { COOKIE_PANEL_LOCAL_STORAGE_KEY } from "./constants";

const CookiePanel = () => {
    const { classes } = useStyles();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        localStorage.setItem(COOKIE_PANEL_LOCAL_STORAGE_KEY, "true");
        setShow(false);
    };

    useEffect(() => {
        const isInitialShow = !localStorage.getItem(COOKIE_PANEL_LOCAL_STORAGE_KEY);
        setShow(isInitialShow);
    }, []);

    if (!show) {
        return null;
    }

    return (
        <Flex className={classes.root}>
            <Paragraph variant="text-small-m" color="neutralWhite">
                Мы используем cookie. Это позволяет нам анализировать взаимодействие посетителей с сайтом и делать его лучше. Продолжая
                пользоваться сайтом, <br /> вы соглашаетесь с использованием файлов cookie.
            </Paragraph>
            <Button variant="white" onClick={handleClose}>
                Хорошо
            </Button>
        </Flex>
    );
};

export default memo(CookiePanel);
