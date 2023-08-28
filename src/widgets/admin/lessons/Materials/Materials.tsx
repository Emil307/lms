import { Box, Flex } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { UploadedFileFromList, storageApi } from "@entities/storage";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { columnOrder, columns } from "./constants";
import { AddMaterialsButton, ListMenu } from "./components";
import { AdminLessonMaterialsExtraParams } from "./types";
import useStyles from "./Materials.styles";
import { adaptGetMaterialFilesRequest } from "./utils";

interface MaterialsProps {
    lessonId: string;
    lessonName: string;
}

const Materials = ({ lessonId, lessonName }: MaterialsProps) => {
    const { classes } = useStyles();
    const userRole = useUserRole();

    return (
        <Box>
            <Flex className={classes.heading}>
                <Heading order={2}>Материалы урока</Heading>
                <AddMaterialsButton lessonId={lessonId} hidden={userRole === Roles.teacher} />
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
