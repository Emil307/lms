import { Badge, Group, GroupProps } from "@mantine/core";
import { CourseTag } from "@entities/course";
import useStyles from "./TagList.styles";

export interface TagListProps extends Omit<GroupProps, "children"> {
    data: CourseTag[];
}
/**
 * Deprecated
 */

const TagList = ({ data, ...props }: TagListProps) => {
    const { classes, cx } = useStyles();

    if (!data.length) {
        return null;
    }

    return (
        <Group {...props} className={cx(classes.root, props.className)}>
            {data.map((tag) => (
                <Badge key={tag.id} className={classes.tag}>
                    {tag.name}
                </Badge>
            ))}
        </Group>
    );
};

export default TagList;
