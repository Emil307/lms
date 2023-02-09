import React from "react";
import { Form } from "formik";

import { DefaultProps, Selectors, MantineNumberSize } from "@mantine/core";
import useStyles from "./BaseForm.styles";

// This type will contain a union with all selectors defined in useStyles,
// in this case it will be `'root' | 'title' | 'description'`
type BaseFormStyleNames = Selectors<typeof useStyles>;

// DefaultProps adds system props support (margin, padding, sx, unstyled, styles and classNames).
// It accepts 2 types: styles names and styles params, both of them are optional
interface BaseFormStyleProps extends DefaultProps<BaseFormStyleNames> {
    radius?: MantineNumberSize;
}

type Props = BaseFormStyleProps & React.ComponentProps<typeof Form>;

export interface BaseFormProps extends Props {}

export default function BaseForm({
    children,
    radius,
    className,
    styles,
    unstyled,
    classNames,
    ...rest
}: BaseFormProps) {
    const { classes, cx } = useStyles(
        // First argument of useStyles is styles params
        undefined,
        // Second argument is responsible for styles api integration
        { name: "BaseForm", classNames, styles, unstyled }
    );

    return (
        <Form {...rest} className={cx(classes.root)}>
            {children}
        </Form>
    );
}
