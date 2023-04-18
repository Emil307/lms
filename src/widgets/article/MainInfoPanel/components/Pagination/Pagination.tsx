import { Flex } from "@mantine/core";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { Button } from "@shared/ui";

//TODO: При подключении эндпоинта прокинуть мету для пагинации
const Pagination = () => {
    return (
        <Flex justify="space-between">
            <Button variant="text" leftIcon={<ArrowLeftCircle />}>
                Назад
            </Button>
            <Button variant="text" rightIcon={<ArrowRightCircle />}>
                Вперед
            </Button>
        </Flex>
    );
};

export default Pagination;
