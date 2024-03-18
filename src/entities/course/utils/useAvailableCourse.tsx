import { useEffect } from "react"
import { hideNotification } from '@mantine/notifications';
import { ToastType, createNotification } from "@shared/utils"
import { CourseAvailableGroup } from "../api"

interface UseAvailableCourseProps {
    courseId?: number
    courseName?: string
    availableGroup?: CourseAvailableGroup | null
}

export const useAvailableCourse = ({ courseId, courseName, availableGroup }: UseAvailableCourseProps) => {
    useEffect(() => {
        if (availableGroup || availableGroup === undefined) {
            return
        }
        createNotification({
            id: String(courseId),
            type: ToastType.INFO,
            autoClose: false,
            title: `Курс "${courseName}" недоступен пользователям`,
            message: "Чтобы этот курс могли видеть пользователи, создайте группу",
        });

        return () => {
            hideNotification(String(courseId))
        }
    }, [availableGroup])
}