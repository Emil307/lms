import { Box } from "@mantine/core";
import { DataGrid } from "@shared/ui";
import { AdminStaticReview, staticReviewApi } from "@entities/staticReview";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

const List = () => {
    return (
        <Box mt={24}>
            <DataGrid<AdminStaticReview>
                queryKey={QueryKeys.GET_ADMIN_STATIC_REVIEWS}
                queryFunction={(params) => staticReviewApi.getAdminStaticReviews(params)}
                queryCacheKeys={["page", "perPage", "sort"]}
                renderActiveBadge={(cell) => cell.row.original.isActive}
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

export default List;
