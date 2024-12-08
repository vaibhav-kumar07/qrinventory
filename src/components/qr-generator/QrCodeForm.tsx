import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dropdown from "../common/DropDown";
import { componentOptions } from "../../types/Inventory";
import { addNewInventoryItem } from "../../services/InventoryService";
import { ErrorType } from "../../utils/errorHandler";
import QRCode from "qrcode";
import { useToast } from "../../contexts/ToastContext";

// Validation Schema
const createItemSchema = z.object({
    name: z.string().min(1, "component name is required"),
    quantity: z.string().min(1, "quantity is required"),
    dateReceived: z.string().min(1, "date is required"),
});

type QRCodeFormValues = z.infer<typeof createItemSchema>;

export default function QRCodeForm() {
    const { successToast } = useToast();
    const [backendError, setBackendError] = useState<string | null>(null);
    const [backendValidationErrors, setBackendValidationErrors] = useState<
        Map<string, string>
    >(new Map());
    const today = new Date().toISOString().split("T")[0];
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<QRCodeFormValues>({
        resolver: zodResolver(createItemSchema),
        defaultValues: {
            name: componentOptions[0].value,
        },
    });

    const onSubmit = async (data: QRCodeFormValues) => {
        setBackendError(null);
        setBackendValidationErrors(new Map());

        try {
            const qrCodeString = JSON.stringify({
                name: data.name,
                dateReceived: data.dateReceived,
                quantity: data.quantity,
            });

            const response = await addNewInventoryItem({
                name: data.name,
                dateReceived: data.dateReceived,
                quantity: data.quantity,
                qrCodeString, // Store the QR string
            });

            const qrCode = await QRCode.toDataURL(`${response.data._id}`);
            downloadQRCode(qrCode);
            successToast("QR Generated and Downloaded Successfully");
        } catch (error: any) {
            if (error.error_type === ErrorType.VALIDATION_ERROR) {
                const validationErrors = new Map<string, string>();
                error.errors?.forEach((err: any) => {
                    validationErrors.set(err.field, err.value);
                });
                setBackendValidationErrors(validationErrors);
            } else {
                // Handle business or server errors
                setBackendError(error.message);
            }
        }
    };

    const handleDropdownChange = (value: string) => {
        setValue("name", value);
    };

    // Function to trigger the download of the QR code
    const downloadQRCode = (qrCodeUrl: string) => {
        const link = document.createElement("a");
        link.href = qrCodeUrl;
        link.download = "generated-qr-code.png";
        link.click();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 w-full max-w-3xl space-y-4"
        >
            {/* Component Name */}
            <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <Dropdown
                    options={componentOptions}
                    value={getValues("name")}
                    onChange={handleDropdownChange}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
                {backendValidationErrors.has("name") && (
                    <p className="text-sm text-red-500">
                        {backendValidationErrors.get("name")}
                    </p>
                )}
            </div>

            {/* Part Number */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Quantity *
                </label>
                <input
                    type="text"
                    {...register("quantity")}
                    placeholder="Enter part number"
                    className={`w-full border rounded p-2 ${
                        errors.quantity ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.quantity && (
                    <p className="text-sm text-red-500">
                        {errors.quantity.message}
                    </p>
                )}
                {backendValidationErrors.has("quantity") && (
                    <p className="text-sm text-red-500">
                        {backendValidationErrors.get("quantity")}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
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
                    <p className="text-sm text-red-500">
                        {errors.dateReceived.message}
                    </p>
                )}
                {backendValidationErrors.has("dateReceived") && (
                    <p className="text-sm text-red-500">
                        {backendValidationErrors.get("dateReceived")}
                    </p>
                )}
            </div>

            {/* Backend Error */}
            {backendError && (
                <p className="text-sm text-red-500">{backendError}</p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Generate QR Code
            </button>
        </form>
    );
}
