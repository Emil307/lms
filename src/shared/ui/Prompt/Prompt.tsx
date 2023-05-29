import { Flex, ThemeIcon, Text, ActionIcon, FlexProps } from "@mantine/core";
import { Info, X } from "react-feather";
import useStyles from "./Prompt.styles";

export interface PromptProps extends FlexProps {
    content: string;
    onClose: () => void;
}

const Prompt = ({ content, onClose, ...props }: PromptProps) => {
    const { classes } = useStyles();
    return (
        <Flex {...props} className={classes.root}>
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
