import KhataTableCell from "./TableCell";
import { ITableMetadata } from "./Table";
import { cn } from "../../../utils/cn";

interface ITableRowProps {
    metadata: ITableMetadata[];
    data: any;
    className?: string;
}

export default function TableRow(props: ITableRowProps) {
    return (
        <div
            className={cn(
                "flex w-full flex-col md:flex-row  lg:flex-nowrap bg-white  border  rounded-lg md:rounded-none shadow lg:shadow-none hover:bg-gray-100 transition-all duration-200 md:items-center  ",
                props.className,
            )}
        >
            {props.metadata.map((meta) => (
                <KhataTableCell
                    key={meta.columnName}
                    meta={meta}
                    value={props.data[meta.columnName]}
                    rowdata={props.data}
                />
            ))}
        </div>
    );
}
