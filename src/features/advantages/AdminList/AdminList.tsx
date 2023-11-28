import { Box } from "@mantine/core";
import { ManagedDataGrid } from "@shared/ui";
import { Advantage, staticPageApi } from "@entities/staticPage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

const AdminList = () => {
    return (
        <Box>
            <ManagedDataGrid<Advantage>
                queryKey={[QueryKeys.GET_ADMIN_ADVANTAGES, [EntityNames.STATIC_ADVANTAGE, EntityNames.USER]]}
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
