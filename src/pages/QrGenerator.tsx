import React from "react";
import QRCodeForm from "../components/qr-generator/QrCodeForm";

const QRGeneratorPage: React.FC = () => {
    return (
        <div className="md:h-screen bg-gray-50 pt-20 pb-5">
            <div className="w-full h-full grid grid-cols-1  gap-4 md:gap-8 px-4 md:px-10">
                <div className="bg-white w-full  rounded-xl border p-6 flex flex-col justify-center items-center gap-3 md:gap-6">
                    <h1 className="text-3xl font-semibold text-center mb-6">
                        Generate QR
                    </h1>
                    <div className="w-full md:w-1/3">
                        <QRCodeForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRGeneratorPage;
