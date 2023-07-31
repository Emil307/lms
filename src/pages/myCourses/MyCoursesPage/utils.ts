import { GetGroupsCountsResponse } from "@entities/group";
import { TabItem } from "@shared/ui";
import { tabOrder } from "./constants";

interface GetTabListProps {
    data?: GetGroupsCountsResponse;
}

export const getTabList = ({ data = [] }: GetTabListProps): TabItem[] => {
    return data.map((groupsCount, index) => ({
        id: index,
        label: groupsCount.displayName,
        value: groupsCount.name,
        count: groupsCount.count,
    }));
};

export const getSortedTabList = (data: TabItem[]) => {
    return data.sort((a, b) => tabOrder.indexOf(a.value) - tabOrder.indexOf(b.value));
};
