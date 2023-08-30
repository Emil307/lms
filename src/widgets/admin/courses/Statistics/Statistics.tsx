import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { columns, columnOrder } from "./constants";
import { TCourseStatisticsExtraParams } from "./types";
import { AdminCourseStatistics, courseApi } from "@entities/course";
import { ListMenu } from "./components";

interface GroupsProps {
    courseId: string;
}

const Statistics = ({ courseId }: GroupsProps) => {
    const router = useRouter();

    const handleClickCell = (cell: MRT_Cell<AdminCourseStatistics>) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(cell.row.original.id), tab: "composition" } });
    };

    return (
        <ManagedDataGrid<AdminCourseStatistics, unknown, TCourseStatisticsExtraParams>
            queryKey={QueryKeys.GET_ADMIN_COURSE_STATISTICS}
            queryFunction={(params) => courseApi.getAdminCourseStatistics(params)}
            queryCacheKeys={["page", "perPage", "sort", "courseId"]}
            extraFilterParams={{ courseId }}
            onClickCell={handleClickCell}
            columns={columns}
            countName="Группы"
            initialState={{
                columnOrder,
            }}
            renderRowActions={({ row }) => <ListMenu row={row} />}
        />
    );
};

export default Statistics;
