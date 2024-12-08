// QrScannerPage.tsx
import React, { useState } from "react";
import QRCodeScanner from "../components/qr-scanner/QrCodeScanner";
import QRCodeForm from "../components/qr-scanner/QrCodeScannerForm";

const QrScannerPage: React.FC = () => {
    const [qrData, setQrData] = useState<string | null>(null);

    const handleQRData = (data: string) => {
        console.log("qrData", data);
        setQrData(data);
    };

    return (
        <div className="bg-gray-50 h-full pt-14">
            <div className="w-full h-full grid grid-cols-1  gap-6 p-6">
                {/* Left Section: QR Code Upload */}
                <div className="bg-white rounded-2xl border p-6 flex flex-col justify-center gap-3 md:gap-6">
                    <h1 className="text-3xl font-semibold text-center mb-6">
                        Scan QR Code
                    </h1>
                    {!qrData ? (
                        <QRCodeScanner onScan={handleQRData} />
                    ) : (
                        <QRCodeForm qrCodeData={qrData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default QrScannerPage;
