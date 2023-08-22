import { useFinishLesson } from "@entities/lesson";
import { Button, ButtonProps } from "@shared/ui";

export interface FinishLessonButtonProps extends Omit<ButtonProps, "children"> {
    courseId: string;
    lessonId: string;
    nameLesson: string;
    visible?: boolean;
}

const FinishLessonButton = ({ courseId, lessonId, nameLesson, visible = true, ...props }: FinishLessonButtonProps) => {
    const { mutate: finishLesson, isLoading } = useFinishLesson({ lessonId, courseId, name: nameLesson });

    const handleClick = () => finishLesson(null);

    if (!visible) {
        return null;
    }

    return (
        <Button variant="secondary" size="small" disabled={isLoading} {...props} onClick={handleClick}>
            Завершить урок
        </Button>
    );
};

export default FinishLessonButton;
