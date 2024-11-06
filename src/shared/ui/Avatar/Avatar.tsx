import React, { useEffect, useState, forwardRef } from "react";
import { DefaultProps, Selectors, useComponentDefaultProps, MantineGradient } from "@mantine/styles";
import { createPolymorphicComponent } from "@mantine/utils";
import Image from "next/image";
import { AvatarGroup } from "@mantine/core/lib/Avatar/AvatarGroup/AvatarGroup";
import { Colors } from "@mantine/core";
import { AvatarPlaceholderIcon } from "./AvatarPlaceholderIcon";
import useStyles, { AvatarStylesParams } from "./Avatar.styles";

export type AvatarStylesNames = Selectors<typeof useStyles>;

export interface AvatarProps extends DefaultProps<AvatarStylesNames, AvatarStylesParams> {
    height: number | `${number}` | undefined;
    width: number | `${number}` | undefined;
    /** Image url */
    src?: string | null;

    /** Image alt text or title for placeholder variant */
    alt?: string;

    /** Avatar width and height */
    size?: number | "xs" | "sm" | "md" | "lg" | "xl" | undefined;

    /** Value from theme.radius or number to set border-radius in px */
    radius?: number | "xs" | "sm" | "md" | "lg" | "xl" | undefined;

    /** Color from theme.colors used for letter and icon placeholders */
    color?: Colors | undefined;

    /** Controls appearance */
    variant?: "filled" | "light" | "gradient" | "outline" | undefined;

    /** Controls gradient settings in gradient variant only */
    gradient?: MantineGradient;

    /** img element attributes */
    imageProps?: Record<string, any>;

    /** Custom placeholder */
    children?: React.ReactNode;
}

const defaultProps: Partial<AvatarProps> = {
    size: "md",
    color: "gray",
    variant: "light",
};

export const _Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const { className, size, src, alt, radius, children, color, variant, gradient, classNames, styles, imageProps, unstyled, ...others } =
        useComponentDefaultProps("Avatar", defaultProps, props);

    const [error, setError] = useState(!src);

    const { classes, cx } = useStyles(
        {
            color,
            radius,
            size,
            withinGroup: false,
            spacing: 0,
            variant,
            gradient,
            classNames: classNames || undefined,
            styles: styles || undefined,
            unstyled: unstyled || undefined,
            name: "",
        },
        { classNames, styles, unstyled, name: "Avatar" }
    );

    useEffect(() => {
        !src ? setError(true) : setError(false);
    }, [src]);

    return (
        <div className={cx(classes.root, className)} ref={ref} {...others}>
            {error ? (
                <div className={classes.placeholder} title={alt}>
                    {children || <AvatarPlaceholderIcon className={classes.placeholderIcon} />}
                </div>
            ) : (
                <Image
                    width={props.width}
                    height={props.height}
                    {...imageProps}
                    className={classes.image}
                    src={String(src)}
                    alt={String(alt)}
                    onError={() => setError(true)}
                />
            )}
        </div>
    );
}) as any;

_Avatar.displayName = "@mantine/core/Avatar";

export const Avatar = createPolymorphicComponent<"div", AvatarProps, { Group: typeof AvatarGroup }>(_Avatar);
