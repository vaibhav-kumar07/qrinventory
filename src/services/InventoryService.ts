

import { QueryParameters } from '@/types/common';
import { IInventoryItem } from '../types/Inventory';
import * as FetchUtils from '../utils/fetch';
// import { LeaveParams, LeaveStatus } from '../components/types/leave';
// import { QueryParameters } from '../components/types/common';
import qs from 'query-string';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface paramsInterface {
    page: number

}
export const getInventoryItems = async (params: paramsInterface): Promise<any> => {
    const response = await FetchUtils.get(`${backendUrl}/api/inventory?${buildQueryString(params)}`, { isWithToken: false });
    console.log("Fetching attendance", response)
    return response;
};


export const getInventoryItemById = async (qrString: string): Promise<IInventoryItem> => {
    const response = await FetchUtils.get(`${backendUrl}/api/inventory/${qrString}`, { isWithToken: false });
    console.log("Fetching attendance", response)
    return response;
};


export async function updateInventoryItemQuantity({
    id,
    quantity
}: {
    id: string;
    quantity: number;
}) {
    const body = {
        quantity
    };
    const response = await FetchUtils.patch(
        `${backendUrl}/api/inventory/${id}/quantity`,
        { ...body },
        { isWithToken: false }
    );
    return response;
}

export async function updateInventory({
    id,
    name, availableQuantity,
    dateRecieved
}: {
    id: string;
    dateRecieved: string;
    name: string,
    availableQuantity: number

}) {
    const body = {
        name, availableQuantity, dateRecieved
    };
    const response = await FetchUtils.put(
        `${backendUrl}/api/inventory/${id}/`,
        { ...body },
        { isWithToken: false }
    );
    return response;
}


export async function addNewInventoryItem({
    name, quantity,
    dateReceived, qrCodeString
}: {
    name: string, quantity: string,
    dateReceived: string, qrCodeString: string

}) {
    let body = {
        name,
        dateReceived,
        recievedQuantity: Number(quantity),
        qrCode: qrCodeString

    }
    const response = await FetchUtils.post(`${backendUrl}/api/inventory`, { ...body }, {
        isWithToken: false
    })
    return response

}


export const deleteInventoryItem = async (id: string): Promise<any> => {
    let body = {

    }
    const response = await FetchUtils.del(`${backendUrl}/api/inventory/${id}`, { ...body }, { isWithToken: false });
    console.log("Fetching attendance", response)
    return response;
};



export const buildQueryString = (params: paramsInterface) => {
    const queryParams: QueryParameters = {};
    queryParams["pagination[page]"] = params?.page?.toString();
    return qs.stringify(queryParams, {
        arrayFormat: "comma",
        skipNull: true,
        skipEmptyString: true,
        encode: false,
    });
};

export { }