import React, { useState, useRef } from "react";
import jsQR from "jsqr";

interface QRCodeScannerProps {
    onScan: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
    const [qrData, setQrData] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        canvas.width = image.width;
                        canvas.height = image.height;
                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                        const imageData = ctx.getImageData(
                            0,
                            0,
                            canvas.width,
                            canvas.height,
                        );
                        const qrCode = jsQR(
                            imageData.data,
                            canvas.width,
                            canvas.height,
                        );

                        if (qrCode) {
                            setQrData(qrCode.data);
                            onScan(qrCode.data);
                        } else {
                            alert("No QR Code found in the image.");
                        }
                    }
                };
                image.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4 p-2 border rounded-md"
            />
            {qrData ? (
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Scanned Data:</p>
                    <p>{qrData}</p>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">
                    No QR Code detected yet. Please upload an image.
                </p>
            )}
        </div>
    );
};

export default QRCodeScanner;
