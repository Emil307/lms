import { Avatar, AvatarProps, Box, Group } from "@mantine/core";
import { memo, ReactNode, useCallback } from "react";
import { get } from "lodash";
import Image from "next/image";
import { DisplayField } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import useStyles from "./InfoCard.styles";
import { TInfoCardDisplayFields, TInfoCardImageProps } from "./types";

export type TInfoCardProps<T> = {
    fields: TInfoCardDisplayFields<T>;
    hideFieldIfEmpty?: boolean;
    avatar?: AvatarProps;
    values?: T;
    image?: TInfoCardImageProps;
    actionSlot?: ReactNode;
    variant?: "whiteBg" | "grayBg";
};

function InfoCard<T>({ avatar, image, fields, hideFieldIfEmpty = false, values, actionSlot, variant = "whiteBg" }: TInfoCardProps<T>) {
    const { classes } = useStyles({ variant });

    const renderImage = useCallback(() => {
        if (!image || !image.src) {
            return null;
        }
        const { children, src, ...props } = image;
        return (
            <Box className={classes.imageWrapper}>
                <Image className={classes.image} src={src} width={270} height={166} loader={({ src }) => `${src}`} {...props} />
                {children}
            </Box>
        );
    }, [image]);

    const renderAvatar = useCallback(() => {
        if (!avatar) {
            return null;
        }
        return (
            <Avatar
                alt="avatar"
                w={84}
                h={84}
                radius={50}
                styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}
                {...avatar}>
                <AvatarIcon />
            </Avatar>
        );
    }, [avatar]);

    const renderActions = useCallback(() => {
        if (!actionSlot) {
            return null;
        }

        return <Group className={classes.actions}>{actionSlot}</Group>;
    }, [actionSlot]);

    const renderFields = useCallback(
        () =>
            fields.map(({ value, ...field }, index) => {
                const getValue = field.renderString ? field.renderString(get(values, field.name), values) : get(values, field.name);
                if (hideFieldIfEmpty && !getValue) {
                    return null;
                }
                return <DisplayField key={index} {...field} value={getValue} variant="compact" />;
            }),
        [fields, values],
    );

    return (
        <Box className={classes.root}>
            <Group className={classes.content}>
                {renderImage()}
                {renderAvatar()}
                {renderFields()}
            </Group>
            {renderActions()}
        </Box>
    );
}

export default memo(InfoCard) as typeof InfoCard;
