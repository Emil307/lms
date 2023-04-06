import { Box, BoxProps, Flex, Title, Text } from "@mantine/core";
import { Carousel } from "@components/Carousel";
import { CoursePackage } from "@entities/coursePackage";
import { CourseListFromPackage, CoursePackageCard } from "@features/coursePackages";
import useStyles from "./CoursePackageList.styles";

export interface CoursePackageListProps extends Omit<BoxProps, "children"> {
    title: string;
    description?: string;
}

//FIXME: Удалить после подключения эндпоинта
const data: CoursePackage[] = [
    {
        id: 1,
        name: "coursePackageName",
        description: "courseDescription",
        courses: {
            data: [
                {
                    id: 1,
                    name: "coursePackage course name 1",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 2,
                    name: "coursePackage course name 2",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 3,
                    name: "coursePackage course name 3",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 4,
                    name: "coursePackage course name 4",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 5,
                    name: "coursePackage course name 5",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 6,
                    name: "coursePackage course name 6",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 7,
                    name: "coursePackage course name 7",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 8,
                    name: "coursePackage course name 8",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
            ],
            meta: {
                pagination: {
                    count: 1,
                    total: 8,
                    per_page: 1,
                    current_page: 2,
                    total_pages: 3,
                    links: {
                        previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                        next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
                    },
                },
            },
        },
        price: 32500,
        isDiscount: false,
        discount: null,
        isPurchased: true,
    },
    {
        id: 2,
        name: "coursePackageName",
        description: "courseDescription",
        courses: {
            data: [
                {
                    id: 123,
                    name: "coursePackage course name",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 123,
                    name: "coursePackage course name",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 123,
                    name: "coursePackage course name",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
                {
                    id: 123,
                    name: "coursePackage course name",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: false,
                },
            ],
            meta: {
                pagination: {
                    count: 1,
                    total: 3,
                    per_page: 1,
                    current_page: 2,
                    total_pages: 3,
                    links: {
                        previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                        next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
                    },
                },
            },
        },
        price: 32500,
        isDiscount: true,
        discount: {
            isActive: true,
            type: "value",
            value: 13,
            from: "2023-02-01T13:13:11.000000Z",
            to: "2023-11-11T13:13:11.000000Z",
        },
        isPurchased: true,
    },
    {
        id: 3,
        name: "coursePackageName",
        description: "courseDescription",
        courses: {
            data: [
                {
                    id: 123,
                    name: "coursePackage course name",
                    slug: "coursePackage course slug",
                    price: 9500,
                    isPurchased: true,
                },
            ],
            meta: {
                pagination: {
                    count: 1,
                    total: 3,
                    per_page: 1,
                    current_page: 2,
                    total_pages: 3,
                    links: {
                        previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                        next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
                    },
                },
            },
        },
        price: 32500,
        isDiscount: true,
        discount: {
            isActive: true,
            type: "value",
            value: 13,
            from: "2023-02-01T13:13:11.000000Z",
            to: "2023-11-11T13:13:11.000000Z",
        },

        isPurchased: true,
    },
];

const CoursePackageList = ({ title, description, ...props }: CoursePackageListProps) => {
    const { classes } = useStyles();
    return (
        <Box {...props} className={classes.root}>
            <Flex direction="column" gap={8} mb={32}>
                <Title order={2} color="dark">
                    {title}
                </Title>
                {description && <Text className={classes.headingDescription}>{description}</Text>}
            </Flex>
            <Carousel<CoursePackage> data={data} slideSize={648}>
                {(props) => (
                    <CoursePackageCard {...props} h={420} w={648}>
                        {(props) => <CourseListFromPackage {...props} />}
                    </CoursePackageCard>
                )}
            </Carousel>
        </Box>
    );
};

export default CoursePackageList;
