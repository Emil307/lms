import { Box, Flex, ThemeIcon } from "@mantine/core";
import { Heart } from "react-feather";
import { GetCoursesResponse } from "@entities/course";
import { BreadCrumbs, Heading, TBreadCrumbItem } from "@shared/ui";
import { useMedia } from "@shared/utils";
import useStyles from "./Header.styles";
import { DeleteFavoriteCoursesButton } from "../DeleteFavoriteCoursesButton";

export interface HeaderProps {
    data?: GetCoursesResponse;
    breadCrumbsItems: TBreadCrumbItem[];
}

const Header = ({ data, breadCrumbsItems }: HeaderProps) => {
    const { classes } = useStyles({ hasCourseData: !!data?.data.length });
    const isTablet = useMedia("sm");

    const titlePage = isTablet ? "Избранное" : "Избранные курсы";

    return (
        <Flex className={classes.root}>
            <Box w="100%">
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Flex align="center" gap={12}>
                    <ThemeIcon color="primaryHover">
                        <Heart />
                    </ThemeIcon>
                    <Heading>{titlePage}</Heading>
                </Flex>
            </Box>
            <DeleteFavoriteCoursesButton data={data} />
        </Flex>
    );
};

export default Header;
