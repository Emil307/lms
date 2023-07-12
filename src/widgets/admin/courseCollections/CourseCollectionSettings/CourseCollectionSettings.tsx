import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { Trash, AlignLeft, Type } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { GetAdminCourseCollectionResponse, useAdminCourseCollection } from "@entities/courseCollection";
import { InfoCard } from "@components/InfoCard";
import { DeleteCourseCollectionModal } from "@features/courseCollections";
import { fields } from "./constants";
import useStyles from "./CourseCollectionSettings.styles";

export interface CourseCollectionSettingsProps {
    id: string;
}

const CourseCollectionSettings = ({ id }: CourseCollectionSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: courseCollectionData } = useAdminCourseCollection({ id });

    const handleOpenUpdateCourseCollectionPage = () =>
        router.push({ pathname: "/admin/settings/course-collections/[id]/edit", query: { id } });

    const handleCloseDeleteModal = () => {
        closeModal("DELETE_COURSE_COLLECTION");
        router.push("/admin/settings/course-collections");
    };

    const openDeleteModal = () => {
        openModal({
            modalId: "DELETE_COURSE_COLLECTION",
            title: "Удаление подборки",
            centered: true,
            children: <DeleteCourseCollectionModal id={id} name={courseCollectionData?.name} onClose={handleCloseDeleteModal} />,
        });
    };

    return (
        <Box mt={32} className={classes.info}>
            <Flex direction="column" gap={32} w="100%">
                <Flex gap={48} align="center">
                    <Heading order={2}>Данные подборки</Heading>
                    <Button onClick={openDeleteModal} variant="text" leftIcon={<Trash />}>
                        Удалить подборку
                    </Button>
                </Flex>
                <Fieldset label="Заголовок" icon={<Type />}>
                    <DisplayField label="Название" value={courseCollectionData?.name} />
                </Fieldset>
                <Fieldset label="Краткое описание" icon={<AlignLeft />}>
                    <Text className={classes.description}>{courseCollectionData?.description}</Text>
                </Fieldset>
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
        </Box>
    );
};

export default CourseCollectionSettings;
