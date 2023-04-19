import { Box } from "@mantine/core";
import { DataGrid } from "@shared/ui";
import { Advantage, staticPageApi } from "@entities/staticPage";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns } from "./constant";
import { ListMenu } from "./components";

const List = () => {
    return (
        <Box>
            <DataGrid<Advantage>
                queryKey={QueryKeys.GET_ADVANTAGES}
                queryFunction={(params) => staticPageApi.getAdvantages(params)}
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

export default List;
