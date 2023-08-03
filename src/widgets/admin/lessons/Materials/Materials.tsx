import { Box, Flex } from "@mantine/core";
import { PlusCircle as PlusCircleIcon } from "react-feather";
import { openModal, closeModal } from "@mantine/modals";
import { Heading, Loader, ManagedDataGrid, Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { UploadedFileFromList, storageApi } from "@entities/storage";
import { SelectTypeMaterial } from "@widgets/admin/materials";
import { useAttachMaterialsToLesson } from "@entities/lesson";
import { AddMaterialsToLessonModal } from "@features/lessons";
import { columnOrder, columns } from "./constants";
import { ListMenu } from "./components";
import { adaptGetMaterialFilesRequest } from "./utils";
import { AdminLessonMaterialsExtraParams } from "./types";

interface MaterialsProps {
    lessonId: string;
    lessonName: string;
}

const Materials = ({ lessonId, lessonName }: MaterialsProps) => {
    const handleCloseAddMaterialsToLessonModal = () => closeModal("ADD_MATERIALS_TO_LESSON");

    const { mutate: attachMaterialsToLesson, isLoading } = useAttachMaterialsToLesson({ lessonId });

    const handleSuccessLoadFiles = (fileIds: string[]) => {
        attachMaterialsToLesson(fileIds);
    };

    const handleOpenSelectMaterialsTypeModal = () => {
        openModal({
            modalId: "SELECT_MATERIALS_TYPE",
            title: "Добавить материалы",
            children: (
                <SelectTypeMaterial onSuccessLoadFiles={handleSuccessLoadFiles} onSelectFromBase={handleOpenAddMaterialsToLessonModal} />
            ),
            size: 912,
        });
    };

    const handleOpenAddMaterialsToLessonModal = () => {
        openModal({
            modalId: "ADD_MATERIALS_TO_LESSON",
            title: "Выбрать из базы материалов",
            children: <AddMaterialsToLessonModal lessonId={lessonId} onClose={handleCloseAddMaterialsToLessonModal} />,
            size: 912,
        });
    };

    return (
        <Box>
            <Loader overlay isLoading={isLoading} />
            <Flex align="center" gap={48}>
                <Heading order={2}>Материалы урока</Heading>
                <Button onClick={handleOpenSelectMaterialsTypeModal} variant="text" leftIcon={<PlusCircleIcon />}>
                    Добавить материалы
                </Button>
            </Flex>

            <ManagedDataGrid<UploadedFileFromList, unknown, AdminLessonMaterialsExtraParams>
                queryKey={QueryKeys.GET_ADMIN_LESSON_MATERIALS}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetMaterialFilesRequest(params))}
                queryCacheKeys={["lessonIds", "page", "perPage", "sort"]}
                extraFilterParams={{ lessonIds: lessonId }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Материалов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} lessonId={lessonId} lessonName={lessonName} />}></ManagedDataGrid>
        </Box>
    );
};

export default Materials;
