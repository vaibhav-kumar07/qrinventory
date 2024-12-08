export interface IInventoryItem {
    _id?: string;
    name: string;
    partNumber: number;
    dateReceived: string;
    dateDispatched: string;
    qrCode: string;
    status: IInventoryItemStatus
    recievedQuantity: number;
    dispachedQuantity: number;
    availableQuantity: number;
}

export enum IInventoryItemStatus {
    Pending = "PENDING",
    Delivered = "DELIVERED",
}


export const componentOptions = [
    { label: "C1", value: "C1" },
    { label: "C2", value: "C2" },
    { label: "C3", value: "C3" },
    { label: "C4", value: "C4" },
    { label: "C5", value: "C5" },
];
export enum IComponentEnum {
    C1 = "C1",
    C2 = "C2",
    C3 = "C3",
    C4 = "C4",
    C5 = "C5",
}