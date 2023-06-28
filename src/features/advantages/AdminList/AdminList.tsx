import { Box, BoxProps } from "@mantine/core";
import { ManagedDataGrid } from "@shared/ui";
import { Advantage, staticPageApi } from "@entities/staticPage";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    return (
        <Box {...props}>
            <ManagedDataGrid<Advantage>
                queryKey={QueryKeys.GET_ADMIN_ADVANTAGES}
                queryFunction={(params) => staticPageApi.getAdminAdvantages(params)}
                queryCacheKeys={["page", "perPage", "sort"]}
                columns={columns}
                countName="Преимуществ"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
            />
        </Box>
    );
};

export default AdminList;
