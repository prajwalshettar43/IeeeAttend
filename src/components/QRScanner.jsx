// QRScanner.jsx
import React, { useState } from 'react';
import { QRScanner as YudielQRScanner } from '@yudiel/react-qr-scanner';

const QRScanner = () => {
  const [result, setResult] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Front Camera QR Scanner</h1>

      <div className="w-full max-w-md aspect-video border-4 border-blue-500 rounded-lg overflow-hidden">
        <YudielQRScanner
          onDecode={(code) => setResult(code)}
          onError={(error) => console.error('QR Error:', error)}
          constraints={{
            video: {
              facingMode: { exact: 'user' } // Front camera
            }
          }}
        />
      </div>

      {result && (
        <div className="mt-6 bg-green-700 p-4 rounded-lg text-white shadow-lg">
          <strong>Scanned Result:</strong>
          <div className="mt-2 break-words">{result}</div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
