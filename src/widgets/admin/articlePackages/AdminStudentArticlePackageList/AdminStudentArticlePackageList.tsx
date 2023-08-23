import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { Heading, ManagedDataGrid } from "@shared/ui";
import { AdminStudentArticlePackageFromList, articlePackageApi } from "@entities/articlePackage";
import { StudentArticlePackageListExtraParams } from "./types";
import { columns, columnOrder } from "./constants";
import { AddStudentArticlePackageButton, ListMenu } from "./components";
import useStyles from "./AdminStudentArticlePackageList.styles";

export interface AdminStudentArticlePackageListProps extends Omit<BoxProps, "children"> {
    studentId: string;
}

const AdminStudentArticlePackageList = ({ studentId, ...props }: AdminStudentArticlePackageListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const handleClickCell = (cell: MRT_Cell<AdminStudentArticlePackageFromList>) => {
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id: String(cell.row.original.id) } });
    };

    return (
        <Box {...props}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Пакеты базы знаний</Heading>
                <AddStudentArticlePackageButton studentId={studentId} />
            </Flex>
            <ManagedDataGrid<AdminStudentArticlePackageFromList, unknown, StudentArticlePackageListExtraParams>
                queryKey={QueryKeys.GET_ADMIN_STUDENT_ARTICLE_PACKAGES}
                queryFunction={(params) => articlePackageApi.getAdminStudentArticlePackages(params)}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Групп"
                extraFilterParams={{ studentId }}
                onClickCell={handleClickCell}
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} studentId={studentId} />}
            />
        </Box>
    );
};

export default AdminStudentArticlePackageList;
