import { createPolymorphicComponent, Text, TextProps } from "@mantine/core";
import { forwardRef } from "react";
import { ParagraphVariant } from "./types";
import useStyles from "./Paragraph.styles";

export interface ParagraphProps extends Omit<TextProps, "variant">, Omit<React.ComponentPropsWithoutRef<"p">, keyof TextProps> {
    variant: ParagraphVariant;
    onClick?: () => void;
}

const ParagraphComponent = forwardRef<HTMLButtonElement, ParagraphProps>(
    ({ children, variant, className, color = "dark", ...props }: ParagraphProps) => {
        const { classes, cx } = useStyles({ variant });

        return (
            <Text className={cx(classes.root, className)} color={color} {...props}>
                {children}
            </Text>
        );
    }
);

ParagraphComponent.displayName = "Paragraph";

const Paragraph = createPolymorphicComponent<"p", ParagraphProps>(ParagraphComponent);

export default Paragraph;
