import { Box, BoxProps } from "@mantine/core";
import { ManagedDataGrid } from "@shared/ui";
import { AdminStaticReviewFromList, staticReviewApi } from "@entities/staticReview";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    return (
        <Box {...props}>
            <ManagedDataGrid<AdminStaticReviewFromList>
                queryKey={QueryKeys.GET_ADMIN_STATIC_REVIEWS}
                queryFunction={(params) => staticReviewApi.getAdminStaticReviews(params)}
                queryCacheKeys={["page", "perPage", "sort"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Отзывов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default AdminList;
