import { Text, TextProps } from "@mantine/core";
import { ParagraphVariant } from "./types";
import useStyles from "./Paragraph.styles";

export interface ParagraphProps extends Omit<TextProps, "variant"> {
    variant: ParagraphVariant;
}

const Paragraph = ({ children, variant, ...props }: ParagraphProps) => {
    const { classes } = useStyles({ variant });

    return (
        <Text component="p" className={classes.root} {...props}>
            {children}
        </Text>
    );
};

export default Paragraph;
