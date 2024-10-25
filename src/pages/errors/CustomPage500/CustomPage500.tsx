import Image from "next/image";
import { Flex, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { getStartPage } from "@app/routes";
import image500 from "public/500.png";
import useStyles from "./CustomPage500.styles";

const CustomPage500 = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const userRole = useUserRole();

    const handleGoToMainPage = () => {
        router.push(getStartPage(userRole?.name));
    };

    return (
        <Flex direction="column" align="center" gap={48}>
            <Box className={classes.imageWrapper}>
                <Image src={image500} fill alt="500 ошибка" priority />
            </Box>
            <Flex direction="column" gap={16}>
                <Heading align="center">Внутренняя ошибка сервера</Heading>
                <Heading order={3} color="neutralGray300" align="center">
                    Наши специалисты уже работают над устранением данной ошибки. Пожалуйста, подождите или попробуйте воспользоваться
                    кнопкой «Перейти на главную».
                </Heading>
            </Flex>
            <Button variant="primary" onClick={handleGoToMainPage}>
                Перейти на главную
            </Button>
        </Flex>
    );
};

export default CustomPage500;
