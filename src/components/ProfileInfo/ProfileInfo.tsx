import { Avatar, Box, Group } from "@mantine/core";
import { ReactNode, useMemo } from "react";
import { get } from "lodash";
import { DisplayField, DisplayFieldProps } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import useStyles from "./ProfileInfo.styles";

export type ProfileInfoDisplayFields<T> = (DisplayFieldProps & {
    name: keyof T | string;
    renderString?: (value: T[keyof T], item?: T) => string;
})[];

export interface ProfileInfoProps<T> {
    fields: ProfileInfoDisplayFields<T>;
    avatarSrc?: string;
    values?: T;
    actionSlot?: ReactNode;
    variant?: "whiteBg" | "grayBg";
}

export default function ProfileInfo<T>({ avatarSrc, fields, values, actionSlot, variant = "whiteBg" }: ProfileInfoProps<T>) {
    const { classes } = useStyles({ variant });

    const renderActions = useMemo(() => {
        if (!actionSlot) {
            return null;
        }

        return <Group className={classes.actions}>{actionSlot}</Group>;
    }, [actionSlot]);

    const renderFields = useMemo(
        () =>
            fields.map(({ value, ...field }, index) => {
                const getValue = field.renderString ? field.renderString(get(values, field.name), values) : get(values, field.name);
                return <DisplayField key={index} {...field} value={getValue} variant="compact" />;
            }),
        [fields, values]
    );

    return (
        <Box className={classes.root}>
            <Group className={classes.content}>
                <Avatar
                    src={avatarSrc}
                    alt="avatar"
                    w={84}
                    h={84}
                    radius={50}
                    styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                    <AvatarIcon />
                </Avatar>
                {renderFields}
            </Group>
            {renderActions}
        </Box>
    );
}
