import { Flex, ThemeIcon } from "@mantine/core";
import IconMessageDots from "public/icons/messageDots.svg";
import { Paragraph } from "@shared/ui";
import useStyles from "./EmptyBlock.styles";

const EmptyBlock = () => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <ThemeIcon className={classes.icon}>
                <IconMessageDots />
            </ThemeIcon>
            <Paragraph variant="large" color="gray45">
                Нет активного диалога
            </Paragraph>
        </Flex>
    );
};

export default EmptyBlock;
