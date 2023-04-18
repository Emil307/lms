import { Flex, ThemeIcon, Text, ActionIcon } from "@mantine/core";
import { Info, X } from "react-feather";
import useStyles from "./Prompt.styles";

export interface PromptProps {
    content: string;
    onClose: () => void;
}

const Prompt = ({ content, onClose }: PromptProps) => {
    const { classes } = useStyles();
    return (
        <Flex className={classes.root}>
            <ThemeIcon className={classes.icon} variant="outline">
                <Info width={32} height={32} />
            </ThemeIcon>
            <Text className={classes.content}>{content}</Text>
            <ActionIcon className={classes.closeIcon} onClick={onClose}>
                <X />
            </ActionIcon>
        </Flex>
    );
};

export default Prompt;
