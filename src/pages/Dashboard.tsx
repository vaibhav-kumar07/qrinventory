import { useCallback, useEffect, useState } from "react";
import { useTagContext } from "../contexts/TagContext";
import { getInventoryItems } from "../services/InventoryService";
import { IResponse } from "../types/common";
import Loader from "../components/common/Loader";
import InventoryTable from "../components/inventory/InventoryTable";
import Pagination from "../components/common/pagination/Pagination";
import { useSearchParams } from "react-router-dom";

export default function InventoryPage() {
    const { isTagOn, clearTag } = useTagContext();
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState<IResponse>();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const fetchInventory = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getInventoryItems({
                page: page as number,
            });
            setResponse(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching inventory items:", error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        if (isTagOn("Inventory")) {
            fetchInventory().then(() => clearTag("Inventory"));
        } else {
            fetchInventory();
        }
    }, [fetchInventory, isTagOn, clearTag]);

    return (
        <div className="pt-20 px-8">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <InventoryTable items={response?.data} />
                    <Pagination
                        recordCount={response?.meta.pagination.total || 0}
                    />
                </>
            )}
        </div>
    );
}
