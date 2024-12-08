import { IInventoryItem } from "../../../types/Inventory";
import CommonButton from "../../../components/common/Button";
import { MdDeleteForever } from "react-icons/md";
import { deleteInventoryItem } from "../../../services/InventoryService";
import { EditInventoryDialogWidget } from "./EditInventoryItemDialog";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../contexts/ToastContext";
import { useTagContext } from "../../../contexts/TagContext";
export default function ActionsWidget({
    rowData,
}: {
    rowData: IInventoryItem;
    value: string;
}) {
    const { token } = useAuth();
    const { errorToast } = useToast();
    const { setTag } = useTagContext();
    async function handleDelete() {
        try {
            await deleteInventoryItem(rowData._id as string);
            errorToast("Component deleted successfully");
            setTag("Inventory");
        } catch (err) {
            console.log("error deleting", err);
        }
    }
    console.log("token", token);
    return (
        <div className="w-full flex items-center gap-4 ">
            <EditInventoryDialogWidget inventoryItem={rowData} />
            <CommonButton
                variant="destructive"
                className="p-0"
                onClick={handleDelete}
                disabled={!token}
            >
                <MdDeleteForever size={25} />
            </CommonButton>
        </div>
    );
}
