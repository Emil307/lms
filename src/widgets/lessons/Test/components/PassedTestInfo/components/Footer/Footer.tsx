import { Collapse, Flex } from "@mantine/core";
import { useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { Button } from "@shared/ui";
import { GetTestPassResponse } from "@entities/lesson";
import useStyles from "./Footer.styles";
import { TaskAnswer } from "../TaskAnswer";

export interface FooterProps {
    data: GetTestPassResponse;
    openUpdateTestPassForm: () => void;
}

const Footer = ({ data, openUpdateTestPassForm }: FooterProps) => {
    const [openedAnswersDetails, setOpenedAnswersDetails] = useState(false);
    const { classes } = useStyles({ isOpenAnswers: openedAnswersDetails });

    const handleToggleVisibilityAnswersDetails = () => setOpenedAnswersDetails(!openedAnswersDetails);

    const labelToggleButton = openedAnswersDetails ? "Скрыть ответы" : "Показать ответы";

    const renderAnswers = useMemo(
        () => data.answers?.map((answer, index) => <TaskAnswer key={answer.id} data={answer} numberTaskAnswer={index + 1} />),
        [data]
    );

    if (data.status.name !== "completed") {
        return (
            <Button variant="secondary" onClick={openUpdateTestPassForm} maw={200}>
                Пройти заново
            </Button>
        );
    }

    return (
        <>
            <Collapse in={openedAnswersDetails} w="100%">
                <Flex direction="column" gap={32}>
                    {renderAnswers}
                </Flex>
            </Collapse>
            <Button
                variant="text"
                onClick={handleToggleVisibilityAnswersDetails}
                rightIcon={<ChevronUp />}
                className={classes.buttonToggle}>
                {labelToggleButton}
            </Button>
        </>
    );
};

export default Footer;
