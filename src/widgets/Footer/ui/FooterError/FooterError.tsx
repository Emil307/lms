import { Flex } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";
import { Paragraph } from "@shared/ui";
import useStyles from "./FooterError.styles";

const FooterError = () => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.footer}>
            <Paragraph variant="text-small-m">{`© ${dayjs().year()}, Addamant`}</Paragraph>
        </Flex>
    );
};

export default FooterError;
