import { Flex, FlexProps } from "@mantine/core";
import { StaticUserFromList } from "@entities/user";
import { StaticCard as StaticUserCard } from "@features/users";
import { Heading, Paragraph } from "@shared/ui";
import { List as ListComponent } from "@components/List";
import useStyles from "./TeacherList.styles";

export interface TeacherListProps extends Omit<FlexProps, "children"> {
    data: StaticUserFromList[];
}

const TeacherList = ({ data, ...props }: TeacherListProps) => {
    const { classes, cx } = useStyles();

    if (!data.length) {
        return null;
    }

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex direction="column" gap={8}>
                <Heading order={2}>Наставники помогают найти ответы</Heading>
                <Paragraph variant="small-m">Выберите дополнительный курс по более выгодной цене.</Paragraph>
            </Flex>

            <ListComponent<StaticUserFromList>
                data={data}
                renderItem={(props) => <StaticUserCard {...props} />}
                colProps={{ lg: 4, sm: 6, xs: 12 }}
            />
        </Flex>
    );
};

export default TeacherList;
