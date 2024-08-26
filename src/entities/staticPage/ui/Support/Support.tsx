import { Box, Flex, MediaQuery } from "@mantine/core";
import React from "react";
import Image from "next/image";
import { Button } from "@shared/ui";
import SupportBannerDesktop from "@public/supportBannerDesktop.png";
import SupportBannerMobile from "@public/supportBannerMobile.png";
import { CONTACT } from "@entities/staticPage";
import useStyles from "./Support.styles";

const Support = () => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Box className={classes.imageWrapper}>
                <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                    <Image src={SupportBannerDesktop} fill alt="Поддержка" quality={100} />
                </MediaQuery>
                <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                    <Image src={SupportBannerMobile} fill alt="Поддержка" quality={100} />
                </MediaQuery>
            </Box>
            <Button component="a" href={CONTACT.TELEGRAM_BOT} target="_blank" variant="secondary" size="large" h={72} w="100%">
                Написать в поддержку
            </Button>
        </Flex>
    );
};

export default Support;
