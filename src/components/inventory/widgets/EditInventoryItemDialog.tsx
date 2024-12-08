import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { DialogHeader } from "../../ui/dialog";
import UpdateInventoryForm from "./EditInventoryItemForm";
import { IInventoryItem } from "../../../types/Inventory";
import { Pencil } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import CommonButton from "../../../components/common/Button";

export function EditInventoryDialogWidget({
    inventoryItem,
}: {
    className?: string;
    inventoryItem: IInventoryItem;
}) {
    const { token } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    const handleDialogClose = () => {
        setIsOpen(false);
    };

    const handleDialogOpen = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <CommonButton variant="destructive" disabled={!token}>
                <Pencil
                    size={10}
                    className="w-5 h-5 md:w-6 md:h-6 text-primary  rounded-lg cursor-pointer "
                    onClick={handleDialogOpen}
                />
            </CommonButton>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent
                        className="sm:rounded-3xl max-w-2xl bg-white p-0 overflow-hidden"
                        ref={dialogRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader className="bg-primary text-primary-foreground">
                            <DialogTitle>
                                <h2 className="text-xl text-center font-semibold py-4">
                                    Update Inventory Details
                                </h2>
                            </DialogTitle>
                        </DialogHeader>
                        <UpdateInventoryForm
                            inventoryItem={inventoryItem}
                            onSuccess={handleDialogClose}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
