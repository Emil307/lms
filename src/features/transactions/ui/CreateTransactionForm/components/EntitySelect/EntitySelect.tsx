import { useDebouncedState } from "@mantine/hooks";
import { useEffect } from "react";
import { TransactionEntityTypeName, useAdminTransactionCreateEntities } from "@entities/transaction";
import { FSelect, SelectProps, prepareOptionsForSelect } from "@shared/ui";
import { useIntersection } from "@shared/utils";
import { initialParams } from "./constants";

export interface EntitySelectProps extends Omit<SelectProps, "data"> {
    name: string;
    entityType: TransactionEntityTypeName;
}

const EntitySelect = ({ name, entityType, ...props }: EntitySelectProps) => {
    const [query, setQuery] = useDebouncedState("", 500);

    const {
        data: entitiesResourcesData,
        hasNextPage,
        fetchNextPage,
        isFetching,
        isRefetching,
    } = useAdminTransactionCreateEntities({ ...initialParams, query, entityType, filter: {} });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage && !isFetching && !isRefetching) {
            fetchNextPage();
        }
    }, [entry]);

    const getOptions = () => {
        switch (entityType) {
            case "course":
                return prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" });
            case "articlePackage":
                return prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" });
            default:
                return [];
        }
    };

    return (
        <>
            <FSelect
                {...props}
                name={name}
                size="sm"
                data={getOptions()}
                clearable
                label="Сущность"
                searchable
                variantSearhableSelect="default"
                disabled={!entityType}
                lastElementRef={lastElemRef}
                onSearchChange={setQuery}
                maxDropdownHeight={150}
            />
        </>
    );
};

export default EntitySelect;
