import { Group, Text, ThemeIcon } from "@mantine/core";
import { Button } from "@shared/ui";
import CookieIcon from "@public/icons/cookie.svg";
import useStyles from "./AcceptCookiesInfo.styles";

const AcceptCookiesInfo = () => {
    const { classes } = useStyles();

    const handleSubmit = () => localStorage.setItem("ACCEPT_COOKIES", "true");

    return (
        <Group className={classes.root}>
            <ThemeIcon w={56} h={56} radius={50}>
                <CookieIcon />
            </ThemeIcon>
            <Text className={classes.text}>
                Мы используем cookie. Это позволяет нам анализировать взаимодействие посетителей с сайтом и делать его лучше. Продолжая
                пользоваться сайтом, вы соглашаетесь с использованием файлов cookie.
            </Text>
            <Button variant="white" mt={16} onClick={handleSubmit}>
                Хорошо
            </Button>
        </Group>
    );
};

export default AcceptCookiesInfo;
