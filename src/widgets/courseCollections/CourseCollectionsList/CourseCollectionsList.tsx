import React, { useState } from "react";
import { Flex } from "@mantine/core";
import { CourseCollection, useCourseCollections } from "@entities/courseCollection";
import { adaptGetCourseCollectionsRequest } from "@features/courseCollections/List/utils";
import { List as ListComponent } from "@components/List";
import { Card } from "@features/courseCollections";
import useStyles from "./CourseCollectionsList.styles";

interface ShowMoreButtonProps {
    remainingCount: number;
    onClick: () => void;
    className?: string;
}

// TODO: Переиспользовать / вынести в components
const getCorrectWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return "подборок";
    }

    if (lastDigit === 1) {
        return "подборка";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "подборки";
    }

    return "подборок";
};

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ remainingCount, onClick, className }) => {
    const correctWord = getCorrectWord(remainingCount);

    return (
        <Flex onClick={onClick} className={className}>
            Еще {remainingCount} {correctWord}
        </Flex>
    );
};

const CourseCollectionsList: React.FC = () => {
    const { data: courseCollectionsData, isLoading } = useCourseCollections(adaptGetCourseCollectionsRequest({ paginate: false }));
    const [itemsToShow, setItemsToShow] = useState<number>(6);
    const { classes } = useStyles();
    const colProps = { sm: 12, md: 4 };

    if (!courseCollectionsData) {
        return null;
    }

    const handleShowMore = (): void => {
        setItemsToShow((prevItems) => prevItems + 6);
    };

    const visibleData = courseCollectionsData.slice(0, itemsToShow);
    const remainingCount = courseCollectionsData.length - itemsToShow;
    const itemsToAdd = remainingCount > 6 ? 6 : remainingCount;

    return (
        <>
            <ListComponent<CourseCollection>
                data={visibleData}
                renderItem={(props) => <Card {...props} customStyles={useStyles} gap={24} />}
                colProps={colProps}
                isLoading={isLoading}
            />
            {remainingCount > 0 && (
                <ShowMoreButton remainingCount={itemsToAdd} onClick={handleShowMore} className={classes.buttonLoadMore} />
            )}
        </>
    );
};

export default CourseCollectionsList;
