import { Flex } from "@mantine/core";
import { Paragraph } from "@shared/ui";
import React from "react";
import useStyles from "./FooterError.styles";

const FooterError = () => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.footer}>
            <Paragraph variant="text-small-m">&#169; {`${new Date().getFullYear()}, Галерея бизнеса `}</Paragraph>
        </Flex>
    );
};

export default FooterError;
