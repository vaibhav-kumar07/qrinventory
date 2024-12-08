import { useToast } from "../../contexts/ToastContext";
import {
    getInventoryItemById,
    updateInventoryItemQuantity,
} from "../../services/InventoryService";
import React, { useState, useEffect } from "react";

interface QRCodeFormProps {
    qrCodeData: string;
}

const QRScannerForm: React.FC<QRCodeFormProps> = ({ qrCodeData }) => {
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [reFreshDetails, setReFreshDetails] = useState<boolean>(false);
    const { successToast } = useToast();

    useEffect(() => {
        if (qrCodeData) {
            const fetchDetails = async () => {
                const details = await getInventoryItemById(qrCodeData);
                setName(details.name);
                setAvailableQuantity(details.availableQuantity);
                setQuantity(details.availableQuantity); // Set initial quantity to available quantity
                setId(details._id!);
                setReFreshDetails(false);
            };
            fetchDetails();
        }
    }, [qrCodeData, reFreshDetails]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);
        if (newQuantity > availableQuantity) {
            setError("Quantity cannot be greater than the total quantity.");
        } else {
            setError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Submit");
        e.preventDefault();
        if (quantity > availableQuantity) {
            setError("Quantity cannot be greater than the total quantity.");
            return;
        }
        try {
            await updateInventoryItemQuantity({ id, quantity });
            setError("");
            successToast("Quantity updated successfully!");
            setReFreshDetails(true);
        } catch (error) {
            console.error("Error updating quantity:", error);
            setError("Failed to update quantity. Please try again.");
        }
    };

    if (!qrCodeData)
        return <p className="text-center">Loading QR details...</p>;

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Edit QR Code Details
                </h2>

                <div className="mt-4 text-gray-600">
                    <p>
                        <strong>Name:</strong> {name}
                    </p>

                    <p>
                        <strong>Available Quantity:</strong> {availableQuantity}
                    </p>
                </div>
            </div>

            {/* Quantity Field */}
            <div className="space-y-2">
                <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                >
                    Quantity Dispatched*
                </label>
                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={0}
                    max={availableQuantity}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={quantity > availableQuantity || quantity <= 0}
                >
                    Update Quantity
                </button>
            </div>
        </form>
    );
};

export default QRScannerForm;
