import { Flex, ThemeIcon, Text } from "@mantine/core";
import IconMessageDots from "public/icons/messageDots.svg";
import useStyles from "./EmptyBlock.styles";

const EmptyBlock = () => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <ThemeIcon variant="outline" className={classes.icon}>
                <IconMessageDots />
            </ThemeIcon>
            <Text className={classes.description}>Нет активного диалога</Text>
        </Flex>
    );
};

export default EmptyBlock;
