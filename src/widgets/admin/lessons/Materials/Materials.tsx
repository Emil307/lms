import { Box, Flex } from "@mantine/core";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { EntityNames, QueryKeys } from "@shared/constant";
import { UploadedFileFromList, storageApi } from "@entities/storage";
import { useUserRole } from "@entities/auth";
import { Roles } from "@shared/types";
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
                <AddMaterialsButton lessonId={lessonId} hidden={userRole?.name === Roles.teacher} />
            </Flex>

            <ManagedDataGrid<UploadedFileFromList, unknown, AdminLessonMaterialsExtraParams>
                queryKey={[QueryKeys.GET_ADMIN_LESSON_MATERIALS, [EntityNames.MATERIAL, EntityNames.CATEGORY, EntityNames.LESSON]]}
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
