import Image from "next/image";
import { Flex, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { getStartPage } from "@app/routes";
import image404 from "public/404.png";
import useStyles from "./CustomPage404.styles";

const CustomPage404 = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const userRole = useUserRole();

    const handleGoToMainPage = () => {
        router.push(getStartPage(userRole));
    };

    return (
        <Flex direction="column" align="center" gap={48}>
            <Box className={classes.imageWrapper}>
                <Image src={image404} fill alt="404 ошибка" />
            </Box>
            <Flex direction="column" gap={16}>
                <Heading align="center">Ого! Вы нашли несуществующую страницу</Heading>
                <Heading order={3} color="neutral_gray" align="center">
                    Воспользуйтесь кнопкой «Перейти на главную» для перехода на страницу которая точно существует.
                </Heading>
            </Flex>
            <Button variant="primary" onClick={handleGoToMainPage}>
                Перейти на главную
            </Button>
        </Flex>
    );
};

export default CustomPage404;
