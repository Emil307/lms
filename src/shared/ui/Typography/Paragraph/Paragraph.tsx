import { Text, TextProps } from "@mantine/core";
import { ParagraphVariant } from "./types";
import useStyles from "./Paragraph.styles";

export interface ParagraphProps extends Omit<TextProps, "variant"> {
    variant: ParagraphVariant;
    component?: "p" | "span";
    onClick?: () => void;
}

const Paragraph = ({ children, variant, className, color = "dark", component = "p", ...props }: ParagraphProps) => {
    const { classes, cx } = useStyles({ variant });

    return (
        <Text component={component} className={cx(classes.root, className)} color={color} {...props}>
            {children}
        </Text>
    );
};

export default Paragraph;
