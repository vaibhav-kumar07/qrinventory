// import {
//     useURLParams,
//     useGetSearchParamValue,
// } from "@/components/hooks/request";
import { cn } from "../../../utils/cn";
import { Label } from "../Label";

interface ISortableHeaderProps {
    columnName: string;
    label: string;
    defaultSortColumn?: boolean;
    defaultSortOrder?: string;
    className?: string;
    iconClass?: string;
}

export default function SortableHeaderCell({
    label,
    className,
}: ISortableHeaderProps) {
    // const { appendSearchParams } = useURLParams();
    // const _defaultSortColumn = defaultSortColumn ? columnName : "";
    // const sortOrder = useGetSearchParamValue(
    //     _paramKeys.sortOrder,
    //     defaultSortOrder,
    // );
    // const sortColumn = useGetSearchParamValue(
    //     _paramKeys.sortColumn,
    //     _defaultSortColumn,
    // );

    // const handleSort = (column: string) => {
    //     if (column === sortColumn) {
    //         const order =
    //             sortOrder === _sortOrder.asc ? _sortOrder.desc : _sortOrder.asc;

    //         router.push(appendSearchParams(_paramKeys.sortOrder, order));
    //     } else {
    //         router.push(appendSearchParams(_paramKeys.sortColumn, column));
    //     }
    // };

    return (
        <Label
            variant={"semibold"}
            className={cn("cursor-pointer flex items-center ", className)}
            // onClick={() => handleSort(columnName)}
            size={"sm"}
        >
            {label}
            {/* {sortColumn === columnName && (
                <SortArrow direction={sortOrder} className={iconClass} />
            )} */}
        </Label>
    );
}
export function SortArrow({
    direction,
    className,
}: {
    direction: string;
    className?: string;
}) {
    return (
        <span className={cn("text-muted-foreground", className)}>
            {direction === "asc" ? " ▲" : " ▼"}
        </span>
    );
}
