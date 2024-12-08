import { IInventoryItem } from "@/types/Inventory";
import GenerateQrWidget from "../inventory/widgets/GenerateQrWidget";
import ActionsWidget from "../inventory/widgets/ActionsWidget";

const widgets: any = {
    qrGenerateWidget: (value: string, rowData: IInventoryItem) => {
        return <GenerateQrWidget value={value} rowData={rowData} />;
    },
    actionsWidget: (value: string, rowData: IInventoryItem) => {
        return <ActionsWidget value={value} rowData={rowData} />;
    },
};

export default function WidgetLibrary({
    widgetName,
    value,
    rowData,
}: {
    widgetName: string;
    value: string;
    rowData?: any;
    className?: string;
}) {
    return widgets[widgetName](value, rowData);
}
