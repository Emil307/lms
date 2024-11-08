import { Collapse, Flex, Box } from "@mantine/core";
import { useMemo, useState } from "react";
import { ChevronUp } from "react-feather";
import { Button } from "@shared/ui";
import { TestPass } from "@entities/lesson";
import useStyles from "./Footer.styles";
import { TaskAnswer } from "../TaskAnswer";

export interface FooterProps {
    data: TestPass;
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
        <Box>
            <Box>
                <Collapse in={openedAnswersDetails} w="100%">
                    <Flex className={classes.answerListWrapper}>{renderAnswers}</Flex>
                </Collapse>
            </Box>
            <Button
                variant="text"
                onClick={handleToggleVisibilityAnswersDetails}
                rightIcon={<ChevronUp />}
                className={classes.buttonToggle}>
                {labelToggleButton}
            </Button>
        </Box>
    );
};

export default Footer;
