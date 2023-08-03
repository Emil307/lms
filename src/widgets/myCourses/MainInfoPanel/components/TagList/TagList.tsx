import { Badge, Group, GroupProps } from "@mantine/core";
import { CourseTag } from "@entities/course";
import useStyles from "./TagList.styles";

export interface TagListProps extends Omit<GroupProps, "children"> {
    data: CourseTag[];
}

const TagList = ({ data, ...props }: TagListProps) => {
    const { classes } = useStyles();

    if (!data.length) {
        return null;
    }

    return (
        <Group {...props} sx={{ gap: 4 }}>
            {data.map((tag) => (
                <Badge key={tag.id} className={classes.tag}>
                    #{tag.name}
                </Badge>
            ))}
        </Group>
    );
};

export default TagList;
