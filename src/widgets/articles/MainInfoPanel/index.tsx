import { MainInfoPanelNavigated, MainInfoPanel as MainInfoPanelMain } from "./ui";
import { TMainInfoPanelExtensions, TMainInfoPanelType } from "./types";

type TMainInfoPanelProps = {
    type: TMainInfoPanelType;
};

export const MainInfoPanel = ({ type }: TMainInfoPanelProps & TMainInfoPanelExtensions) => {
    return { type };
};

MainInfoPanel.Main = MainInfoPanelMain;
MainInfoPanel.Navigated = MainInfoPanelNavigated;
