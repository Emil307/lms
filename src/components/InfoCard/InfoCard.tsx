import { Avatar, AvatarProps, Box, Flex, Group } from "@mantine/core";
import { memo, ReactNode, useCallback } from "react";
import { get } from "lodash";
import Image from "next/image";
import { DisplayField } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { Image as ImageIcon } from "react-feather";
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
                    {src && <Image className={classes.image} src={src} width={270} height={166} {...props} alt="infoCardImage" />}
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

        return <Flex className={classes.iconWrapper}>{icon}</Flex>;
    }, [iconName]);

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
