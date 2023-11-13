import { UpdateScheduleFormValidation } from "./types";

export const initialValues: UpdateScheduleFormValidation = {
    scheduleDate: null,
    scheduleTimings: [{ to: null, from: null }],
};
