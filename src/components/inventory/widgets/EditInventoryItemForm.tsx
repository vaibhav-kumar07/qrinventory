import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    componentOptions,
    IComponentEnum,
    IInventoryItem,
    IInventoryItemStatus,
} from "../../../types/Inventory";
import Dropdown from "../../common/DropDown";
import { updateInventory } from "../../../services/InventoryService";
import { useTagContext } from "../../../contexts/TagContext";
import { useToast } from "../../../contexts/ToastContext";

const updateInventorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    dateReceived: z.string().min(1, "Date Received is required"),
    status: z.enum([
        IInventoryItemStatus.Pending,
        IInventoryItemStatus.Delivered,
    ]),
    availableQuantity: z.coerce
        .number()
        .min(1, "Available quantity must be at least 1"),
});

type UpdateInventoryFormValues = z.infer<typeof updateInventorySchema>;

export default function UpdateInventoryForm({
    inventoryItem,
    onSuccess,
}: {
    inventoryItem: IInventoryItem;
    onSuccess: () => void;
}) {
    const { successToast, errorToast } = useToast();
    const { setTag } = useTagContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UpdateInventoryFormValues>({
        resolver: zodResolver(updateInventorySchema),
        defaultValues: {
            name: inventoryItem.name,
            dateReceived: inventoryItem.dateReceived,
            status: inventoryItem.status,
            availableQuantity: inventoryItem.availableQuantity,
        },
    });
    const today = new Date().toISOString().split("T")[0];
    const onSubmit = async (data: UpdateInventoryFormValues) => {
        if (
            data.name === inventoryItem.name &&
            data.dateReceived === inventoryItem.dateReceived &&
            data.status === inventoryItem.status &&
            data.availableQuantity === inventoryItem.availableQuantity
        ) {
            errorToast("Please Updated Details to update component");
            return;
        }
        const response = await updateInventory({
            id: inventoryItem!._id as string,
            name: data.name,
            dateRecieved: data.dateReceived,
            availableQuantity: Number(data.availableQuantity),
        });
        if (response.message) {
            onSuccess();
            successToast("Component details updated successfully");
            setTag("Inventory");
        }
    };

    const handleStatusDropdownChange = (value: string) => {
        setValue("status", value as IInventoryItemStatus);
    };
    const handleComponentDropdownChange = (value: string) => {
        setValue("name", value as IComponentEnum);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 rounded-lg max-w-4xl sm:px-10 mb-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                    <div>
                        <label className="block text-sm text-gray-600 ">
                            Name*
                        </label>
                        <Dropdown
                            options={componentOptions}
                            value={inventoryItem.status}
                            onChange={handleComponentDropdownChange}
                            error={errors.status?.message}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-sm text-warning">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1 ">
                        Date Received *
                    </label>
                    <input
                        type="date"
                        {...register("dateReceived", {
                            validate: (value) =>
                                new Date(value) >= new Date(today) ||
                                "Past dates are not allowed.",
                        })}
                        className={`pr-6 cursor-pointer w-full border rounded p-2 ${
                            errors.dateReceived
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        min={today} // Set the minimum date to today's date
                    />

                    {errors.dateReceived && (
                        <p className="text-sm text-warning">
                            {errors.dateReceived.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-600 ">
                        Status*
                    </label>
                    <Dropdown
                        options={Object.values(IInventoryItemStatus).map(
                            (status) => ({
                                label: status,
                                value: status,
                            }),
                        )}
                        value={inventoryItem.status}
                        onChange={handleStatusDropdownChange}
                        error={errors.status?.message}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Available Quantity*
                    </label>
                    <input
                        type="number"
                        {...register("availableQuantity")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.availableQuantity
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Available Quantity"
                    />
                    {errors.availableQuantity && (
                        <p className="text-sm text-warning">
                            {errors.availableQuantity.message}
                        </p>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-2 mt-6 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
                Update
            </button>
        </form>
    );
}
