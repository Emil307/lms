import { Text, TextProps } from "@mantine/core";
import { ParagraphVariant } from "./types";
import useStyles from "./Paragraph.styles";

export interface ParagraphProps extends Omit<TextProps, "variant"> {
    variant: ParagraphVariant;
    onClick?: () => void;
}

const Paragraph = ({ children, variant, className, color = "dark", ...props }: ParagraphProps) => {
    const { classes, cx } = useStyles({ variant });

    return (
        <Text component="p" className={cx(classes.root, className)} color={color} {...props}>
            {children}
        </Text>
    );
};

export default Paragraph;
