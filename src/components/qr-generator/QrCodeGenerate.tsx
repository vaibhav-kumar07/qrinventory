import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeGenerateProps {
    qrCodeString: string;
}

const QRCodeGenerate: React.FC<QRCodeGenerateProps> = ({ qrCodeString }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    const generateQRCode = async (value: string) => {
        try {
            const url = await QRCode.toDataURL(value); // Generate QR Code
            setQrCodeUrl(url);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    const handleDownload = () => {
        if (qrCodeUrl) {
            const link = document.createElement("a");
            link.href = qrCodeUrl;
            link.download = "qr-code.png";
            link.click();
        }
    };

    // Generate QR Code whenever value changes
    useEffect(() => {
        if (qrCodeString) {
            generateQRCode(qrCodeString);
        }
    }, [qrCodeString]);

    return (
        <div className="qr-code-container">
            {qrCodeUrl ? (
                <img
                    onClick={handleDownload}
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="qr-code cursor-pointer"
                />
            ) : (
                <p>Generating QR Code...</p>
            )}
        </div>
    );
};

export default QRCodeGenerate;
