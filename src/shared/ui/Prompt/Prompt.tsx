import { Flex, ThemeIcon, ActionIcon, FlexProps } from "@mantine/core";
import { Info, X } from "react-feather";
import useStyles from "./Prompt.styles";
import { Paragraph } from "../Typography";

export interface PromptProps extends FlexProps {
    isOpened: boolean;
    content: string;
    onClose: () => void;
}

const Prompt = ({ isOpened, content, onClose, ...props }: PromptProps) => {
    const { classes } = useStyles();

    if (!isOpened) {
        return null;
    }

    return (
        <Flex {...props} className={classes.root}>
            <ThemeIcon className={classes.icon}>
                <Info width={32} height={32} />
            </ThemeIcon>
            <Paragraph variant="text-small-b" color="neutralMain50" sx={{ flex: 1 }}>
                {content}
            </Paragraph>
            <ActionIcon className={classes.closeIcon} onClick={onClose}>
                <X />
            </ActionIcon>
        </Flex>
    );
};

export default Prompt;
