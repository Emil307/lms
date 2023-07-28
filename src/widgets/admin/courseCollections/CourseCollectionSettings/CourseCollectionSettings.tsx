import { Box, Flex, FlexProps } from "@mantine/core";
import React from "react";
import { AlignLeft, Type } from "react-feather";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Paragraph } from "@shared/ui";
import { GetAdminCourseCollectionResponse, useAdminCourseCollection } from "@entities/courseCollection";
import { InfoCard } from "@components/InfoCard";
import { fields } from "./constants";
import useStyles from "./CourseCollectionSettings.styles";
import { DeleteCourseCollectionButton } from "./components";

export interface CourseCollectionSettingsProps extends Omit<FlexProps, "children"> {
    id: string;
}

const CourseCollectionSettings = ({ id, ...props }: CourseCollectionSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: courseCollectionData } = useAdminCourseCollection({ id });

    const handleOpenUpdateCourseCollectionPage = () =>
        router.push({ pathname: "/admin/settings/course-collections/[id]/edit", query: { id } });

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные автора</Heading>
                    <DeleteCourseCollectionButton data={courseCollectionData} />
                </Flex>
                <Flex direction="column" gap={{ base: 24, md: 32 }}>
                    <Fieldset label="Заголовок" icon={<Type />}>
                        <DisplayField label="Название" value={courseCollectionData?.name} />
                    </Fieldset>
                    <Fieldset label="Краткое описание" icon={<AlignLeft />}>
                        <Paragraph variant="small-m">{courseCollectionData?.description}</Paragraph>
                    </Fieldset>
                </Flex>
            </Flex>
            <Box>
                <InfoCard<GetAdminCourseCollectionResponse>
                    iconName={courseCollectionData?.iconName}
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    values={courseCollectionData}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateCourseCollectionPage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Flex>
    );
};

export default CourseCollectionSettings;
