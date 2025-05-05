import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const isRunningRef = useRef(false); // ✅ Track if scanner is running

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const cameraConfig = { facingMode: "user" };

    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length === 0) {
          setError("No camera found.");
          return;
        }

        html5QrCode
          .start(
            cameraConfig,
            config,
            (decodedText, decodedResult) => {
              setResult(decodedText);
              if (isRunningRef.current) {
                html5QrCode
                  .stop()
                  .then(() => {
                    html5QrCode.clear();
                    isRunningRef.current = false;
                  })
                  .catch((err) => {
                    console.warn("Error stopping scanner:", err);
                  });
              }
            },
            (scanError) => {
              // Ignore scan errors
            }
          )
          .then(() => {
            isRunningRef.current = true;
          })
          .catch((err) => {
            setError("Failed to start scanner: " + err.message);
          });
      })
      .catch((err) => {
        setError("Camera access failed: " + err.message);
      });

    return () => {
      if (isRunningRef.current && html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            html5QrCodeRef.current.clear();
            isRunningRef.current = false;
          })
          .catch((err) => {
            console.warn("Error stopping on cleanup:", err);
          });
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2>QR Scanner (Front Camera)</h2>
      <div
        id="reader"
        ref={qrRef}
        style={{
          width: '100%',
          maxWidth: '400px',
          margin: 'auto',
          border: '2px solid #ccc',
        }}
      />
      {result && (
        <p style={{ marginTop: '1rem', color: 'green' }}>
          ✅ Scanned QR Code: {result}
        </p>
      )}
      {error && (
        <p style={{ marginTop: '1rem', color: 'red' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default QRScanner;
