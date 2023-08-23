import { useDebouncedState, useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { AdminTransactionEntity, AdminTransactionEntityTypeName, useAdminTransactionCreateEntities } from "@entities/transaction";
import { FSelect, prepareOptionsForSelect } from "@shared/ui";
import { initialParams } from "./constants";

export interface EntitySelectProps {
    name: string;
    entityType: AdminTransactionEntityTypeName;
    entity?: AdminTransactionEntity;
}

const EntitySelect = ({ name, entityType, entity }: EntitySelectProps) => {
    const [query, setQuery] = useDebouncedState("", 500);

    const {
        data: entitiesResourcesData,
        hasNextPage,
        fetchNextPage,
        isLoading,
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
            case "course_package":
                if (!entitiesResourcesData?.data.find((course) => course.id === entity?.id)) {
                    return [
                        ...prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" }),
                        { value: String(entity?.id), label: entity?.name },
                    ];
                }
                return prepareOptionsForSelect({ data: entitiesResourcesData?.data, value: "id", label: "name" });

            default:
                return [];
        }
    };

    return (
        <>
            <FSelect
                name={name}
                size="sm"
                data={getOptions()}
                clearable
                label="Сущность"
                searchable
                variantSearhableSelect="default"
                disabled={isLoading || isFetching || !entityType}
                lastElementRef={lastElemRef}
                onSearchChange={setQuery}
                maxDropdownHeight={150}
            />
        </>
    );
};

export default EntitySelect;
