import { Box, Flex, FlexProps } from "@mantine/core";
import React from "react";
import { Shield, User as UserIcon } from "react-feather";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Paragraph } from "@shared/ui";
import { useAdminAuthor } from "@entities/author";
import { InfoCard } from "@components/InfoCard";
import { fields } from "./constants";
import useStyles from "./AuthorSettings.styles";
import { getAuthorInfoCardFields } from "./utils";
import { DeleteAuthorButton } from "./components";

export interface AuthorSettingsProps extends Omit<FlexProps, "children"> {
    id: string;
}

const AuthorSettings = ({ id, ...props }: AuthorSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data } = useAdminAuthor({ id });

    const authorInfoCardFields = getAuthorInfoCardFields(data);

    const openUserEditPage = () => router.push({ pathname: "/admin/settings/authors/[id]/edit", query: { id } });

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные автора</Heading>
                    <DeleteAuthorButton data={data} />
                </Flex>
                <Flex direction="column" gap={{ base: 24, md: 32 }}>
                    <Fieldset label="Личные данные" icon={<UserIcon />}>
                        <DisplayField label="ФИО" value={authorInfoCardFields.fio} />
                    </Fieldset>
                    <Fieldset label="Об авторе" icon={<Shield />}>
                        <Paragraph variant="small-m">{data?.description}</Paragraph>
                    </Fieldset>
                </Flex>
            </Flex>
            <Box>
                <InfoCard
                    avatar={{
                        src: data?.avatar?.absolutePath,
                    }}
                    values={authorInfoCardFields}
                    variant="whiteBg"
                    fields={fields}
                    actionSlot={
                        <Button variant="secondary" onClick={openUserEditPage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default AuthorSettings;
