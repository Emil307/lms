import { Avatar, Box, Group } from "@mantine/core";
import { ReactNode, useMemo } from "react";
import { get } from "lodash";
import { DisplayField, DisplayFieldProps } from "@shared/ui";
import useStyles from "./ProfileInfo.styles";

export type ProfileInfoDisplayFields<T> = (DisplayFieldProps & {
    name: keyof T | string;
})[];

export interface ProfileInfoProps<T> {
    fields: ProfileInfoDisplayFields<T>;
    avatarSrc?: string;
    values?: T;
    actionSlot?: ReactNode;
    variant?: "admin" | "user";
}

export default function ProfileInfo<T>({ avatarSrc, fields, values, actionSlot, variant="user" }: ProfileInfoProps<T>) {
    const { classes } = useStyles({variant});

    const renderActions = useMemo(() => {
        if (!actionSlot) {
            return null;
        }

        return <Group className={classes.actions}>{actionSlot}</Group>;
    }, [actionSlot]);

    const renderFields = useMemo(
        () =>
            fields.map(({ value, ...field }, index) => (
                <DisplayField key={index} {...field} value={get(values, field.name)} variant="compact" />
            )),
        [fields, values]
    );

    return (
        <Box className={classes.root}>
            <Group className={classes.content}>
                <Avatar src={avatarSrc} alt="avatar" w={84} h={84} radius={50} />
                {renderFields}
            </Group>
            {renderActions}
        </Box>
    );
}
