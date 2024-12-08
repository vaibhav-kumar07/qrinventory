import QRCodeGenerate from "../../qr-generator/QrCodeGenerate";
import { IInventoryItem } from "@/types/Inventory";

export default function GenerateQrWidget({
    rowData,
}: {
    rowData: IInventoryItem;
    value: string;
}) {
    return (
        <div className="md:w-1/2">
            <QRCodeGenerate qrCodeString={rowData._id as string} />
        </div>
    );
}
