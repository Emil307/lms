import { ActionIcon, Box, Flex, FlexProps, Group, Text } from "@mantine/core";
import { FormikConfig } from "formik";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { Button, FSearch, FSlider, FSwitch, Form } from "@shared/ui";
import { $CoursesFiltersForm, CoursesFiltersForm, useCourseResources } from "@entities/course";
import { CategoryFilterList, FilterList } from "./components";
import { adaptCourseFiltersForm, getInitialValues, prepareQueryParams } from "./utils";
import { TRouterQueries } from "./types";

export interface FiltersProps extends Omit<FlexProps, "title" | "onSubmit"> {
    title: ReactNode;
}

const Filters = ({ children, title, ...props }: FiltersProps) => {
    const courseResources = useCourseResources();
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;

    const config: FormikConfig<CoursesFiltersForm> = {
        initialValues: { ...getInitialValues(courseResources.data?.prices.highest), ...adaptCourseFiltersForm(queryParams) },
        validationSchema: $CoursesFiltersForm.partial(),
        enableReinitialize: true,
        onSubmit: (values) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, page: "1", ...prepareQueryParams(values) },
                },
                undefined,
                { shallow: true },
            );

            return;
        },
    };

    return (
        <Box {...props}>
            <Form config={config} disableOverlay={false}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: getInitialValues(courseResources.data?.prices.highest) });
                        handleSubmit();
                    };
                    return (
                        <>
                            <Flex justify="space-between" mb={32}>
                                {title}
                                <FSearch name="query" placeholder="Область, тематика" w="100%" maw={264} />
                            </Flex>
                            <Flex gap={40}>
                                <Flex direction="column" gap={32} miw={264}>
                                    <CategoryFilterList name="categoryId" data={courseResources.data?.categories} />
                                    <FilterList
                                        field="subcategoryIds"
                                        filterName="Тематика"
                                        searchPlaceholder="Найти тематики"
                                        labelsPluralString={["тематика", "тематики", "тематик"]}
                                        data={courseResources.data?.subcategories}
                                    />
                                    <FilterList
                                        field="tags"
                                        filterName="Теги"
                                        searchPlaceholder="Найти теги"
                                        labelsPluralString={["тег", "тега", "тегов"]}
                                        data={courseResources.data?.tags}
                                    />
                                    <Flex direction="column" gap={16}>
                                        <Text color="dark" weight={600}>
                                            Цена
                                        </Text>
                                        <FSlider
                                            name="discountPrice"
                                            labelAlwaysOn
                                            min={courseResources.data?.prices.lowest}
                                            max={courseResources.data?.prices.highest}
                                            showTextInfo
                                        />
                                    </Flex>
                                    <FSwitch name="hasDiscount" variant="primary" label="Курс со скидкой" labelPosition="left" />
                                    <Group sx={{ justifyContent: "center", gap: 8 }}>
                                        <Button type="submit" variant="white" leftIcon={<IconFilter />}>
                                            Подобрать
                                        </Button>
                                        {dirty && (
                                            <ActionIcon onClick={handleResetForm}>
                                                <IconFilterOff />
                                            </ActionIcon>
                                        )}
                                    </Group>
                                </Flex>
                                {children}
                            </Flex>
                        </>
                    );
                }}
            </Form>
        </Box>
    );
};

export default Filters;
