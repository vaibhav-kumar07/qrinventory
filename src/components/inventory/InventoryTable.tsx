import { IInventoryItem } from "../../types/Inventory";
import { cn } from "../../utils/cn";
import { Label } from "../common/Label";
import { ITableMetadata } from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
import TableRow from "../common/table/TableRow";

interface InventoryManagementTableProps {
    items: IInventoryItem[];
    className?: string;
}

const InventorysMetadata: ITableMetadata[] = [
    {
        columnName: "index",
        headerLabel: "Sr No.",
        sortable: false,
        columnClass: "w-full md:w-[5%] text-left text-muted-foreground md:pl-4",
        cellClass: "w-full md:w-[5%] text-left md:pl-3 ",
    },
    {
        columnName: "name",
        headerLabel: "Name",
        sortable: true,
        defaultSortOrder: "asc",
        columnClass:
            "w-full md:w-[10%] text-left font-semibold text-muted-foreground",
        cellClass: "w-full md:w-[10%] text-left font-semibold ",
        // type: "widget",
        // widgetName: "profileName",
    },
    {
        columnName: "date_recieved_quantity",
        headerLabel: "Date Recieved / Quantity",
        sortable: false,
        columnClass: "w-full md:w-[20%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[20%] text-left ",
    },
    {
        columnName: "date_dispached_quantity",
        headerLabel: "Date Dispached / Quantity",
        sortable: false,
        columnClass: "w-full md:w-[20%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[20%] ",
    },
    {
        columnName: "status",
        headerLabel: "Status",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
    },
    {
        columnName: "availableQuantity",
        headerLabel: "Pending Items",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
    },
    {
        columnName: "qrCode",
        headerLabel: "QR Code",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
        type: "widget",
        widgetName: "qrGenerateWidget",
    },
    {
        columnName: "Actions",
        headerLabel: "Actions",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%]  overflow-hidden",
        type: "widget",
        widgetName: "actionsWidget",
    },
];

export default function InventoryTable(props: InventoryManagementTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0 ",
                props.className,
            )}
        >
            <TableHeader
                metadata={InventorysMetadata}
                className="border-t border-x text-muted-foreground rounded-t-2xl md:px-0 md:py-3 md:gap-0 bg-gray-100  "
            />
            {props.items?.length ? (
                props.items.map((Inventory: IInventoryItem, index: number) => {
                    const data = {
                        ...Inventory,
                        index: index + 1,
                        date_recieved_quantity: `${Inventory.dateReceived} / ${Inventory.recievedQuantity}`,
                        date_dispached_quantity: `${
                            Inventory.dateDispatched ?? "--"
                        } / ${Inventory.dispachedQuantity} `,
                    };
                    return (
                        <TableRow
                            key={Inventory._id}
                            data={data}
                            metadata={InventorysMetadata}
                            className="w-full border-x border-b border-t-0 p-4 md:py-0 md:px-0"
                        />
                    );
                })
            ) : (
                <div className="py-2 align-middle mx-auto">
                    <Label className="text-gray-500" variant="semibold">
                        No Data found with the matching criteria
                    </Label>
                </div>
            )}
        </div>
    );
}
