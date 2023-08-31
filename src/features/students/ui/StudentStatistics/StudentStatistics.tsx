import { AdminGroupStudentStatistics } from "@entities/group";
import { Flex } from "@mantine/core";
import { Card, Module } from "./components";

interface StudentStatisticsProps {
    data: AdminGroupStudentStatistics;
}

const StudentStatistics = ({ data }: StudentStatisticsProps) => {
    return (
        <Flex gap={32} direction="column">
            <Flex gap={16} wrap="wrap">
                <Card
                    type="homework"
                    title="Прохождение заданий"
                    passingText="домашних заданий выполнено"
                    passingLabel="Выполнено"
                    {...data.homeworks}
                />
                <Card
                    type="test"
                    title="Прохождение тестов"
                    passingText="тестирований выполнено"
                    passingLabel="Выполнено"
                    {...data.tests}
                />
                <Card type="lessons" title="Прохождение уроков" passingText="уроков пройдено" passingLabel="Пройдено" {...data.lessons} />
            </Flex>
            <Flex gap={16} direction="column">
                {data.modules.map((module, index) => (
                    <Module data={module} moduleNumber={index + 1} key={module.id} />
                ))}
            </Flex>
        </Flex>
    );
};

export default StudentStatistics;
