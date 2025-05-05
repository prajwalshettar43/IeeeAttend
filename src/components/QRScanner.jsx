import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = () => {
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>QR Code Scanner</h2>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <QrReader
          constraints={{ facingMode: 'user' }} // 'user' for front camera
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              setError(null);
            }

            if (!!error) {
              setError(error);
            }
          }}
          style={{ width: '100%' }}
        />
      </div>
      <p><strong>Scanned Data:</strong> {data}</p>
      {error && (
        <p style={{ color: 'red' }}>
          <strong>Error:</strong> {error.message}
        </p>
      )}
    </div>
  );
};

export default QRScanner;
