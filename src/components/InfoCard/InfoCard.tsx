import { Avatar, AvatarProps, Box, Flex, Group } from "@mantine/core";
import { memo, ReactNode, useCallback } from "react";
import { get } from "lodash";
import Image from "next/image";
import { Image as ImageIcon } from "react-feather";
import { DisplayField } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { getIcon } from "@shared/utils";
import useStyles from "./InfoCard.styles";
import { TInfoCardDisplayFields, TInfoCardImageProps } from "./types";

export type TInfoCardProps<T> = {
    fields: TInfoCardDisplayFields<T>;
    hideFieldIfEmpty?: boolean;
    avatar?: AvatarProps;
    values?: T;
    image?: TInfoCardImageProps;
    iconName?: string;
    actionSlot?: ReactNode;
    variant?: "whiteBg" | "grayBg";
};

function InfoCard<T>({
    avatar,
    image,
    iconName,
    fields,
    hideFieldIfEmpty = false,
    values,
    actionSlot,
    variant = "whiteBg",
}: TInfoCardProps<T>) {
    const { classes } = useStyles({ variant });

    const renderImage = useCallback(() => {
        if (!image) {
            return null;
        }
        const { children, src, ...props } = image;
        return (
            <Box className={classes.imageWrapper}>
                <Flex className={classes.imageBack}>
                    <ImageIcon />
                    {src && <Image className={classes.image} src={src} fill sizes="100vw" {...props} alt="infoCardImage" />}
                </Flex>
                {children}
            </Box>
        );
    }, [image]);

    const renderIcon = useCallback(() => {
        if (!iconName) {
            return null;
        }

        const icon = getIcon({ iconName });

        return <Box className={classes.iconWrapper}>{icon}</Box>;
    }, [iconName]);

    const renderAvatar = useCallback(() => {
        if (!avatar) {
            return null;
        }
        return (
            <Avatar className={classes.avatarWrapper} alt="avatar" {...avatar}>
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
                const isHidden = typeof field.hidden === "function" ? field.hidden(get(values, field.name), values) : !!field.hidden;

                if ((hideFieldIfEmpty && !getValue) || isHidden) {
                    return null;
                }
                return <DisplayField key={index} {...field} value={getValue} variant="compact" />;
            }),
        [fields, values]
    );

    return (
        <Box className={classes.root}>
            <Flex className={classes.content}>
                {renderIcon()}
                {renderImage()}
                {renderAvatar()}
                {renderFields()}
            </Flex>
            {renderActions()}
        </Box>
    );
}

export default memo(InfoCard) as typeof InfoCard;
