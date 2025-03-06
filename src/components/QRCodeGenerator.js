import { useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import QRCustomizationDrawer from "./QRCustomizationDrawer";
import Loader from "./Loader";
import Button from "./Button"; // Import your custom button

const QRCodeGenerator = () => {
  // State for user input and generated QR code URL.
  const [inputText, setInputText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // QR code appearance settings.
  const [size, setSize] = useState("300x300");
  const [color, setColor] = useState("000000");
  const [bgColor, setBgColor] = useState("ffffff");

  // Additional customization attributes.
  const [errorCorrection, setErrorCorrection] = useState("L"); // Options: L, M, Q, H
  const [margin, setMargin] = useState(4); // Numeric margin value
  const [format, setFormat] = useState("png"); // "png", "gif", "jpeg", "jpg", "svg"

  // Control the drawer and loading state.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = () => {
    if (!inputText) return;

    setIsGenerating(true);
    setTimeout(() => {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&color=${color}&bgcolor=${bgColor}&data=${encodeURIComponent(
        inputText
      )}&ecc=${errorCorrection}&margin=${margin}&format=${format}`;
      setQrCodeUrl(apiUrl);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter text or link (Max 300 chars)"
        maxLength={300}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
      />

      {inputText && (
        <div className="mt-4 flex items-center justify-center">
        <Button onClick={generateQRCode} disabled={isGenerating}>
          {isGenerating
            ? "Generating..."
            : qrCodeUrl
            ? "Re-Generate"
            : "Create QR Code"}
        </Button>
        </div>
      )}

      {/* Show the QR code container if generating or if a QR code URL exists */}
      {isGenerating || qrCodeUrl ? (
        <div
          className="mt-4 flex items-center justify-center bg-white rounded shadow-md"
          style={{
            width: `${size.split("x")[0]}px`,
            height: `${size.split("x")[1]}px`,
          }}
        >
          {isGenerating ? (
            <Loader size={size} color={color} bgColor={bgColor} />
          ) : (
            qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />
          )}
        </div>
      ) : null}

      {/* Side Drawer Button */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="fixed top-4 right-4 bg-gray-700 p-2 rounded"
      >
        ⚙ Customize
      </button>

      {/* Customization Drawer */}
      {drawerOpen && (
        <QRCustomizationDrawer
          size={size}
          setSize={setSize}
          color={color}
          setColor={setColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          errorCorrection={errorCorrection}
          setErrorCorrection={setErrorCorrection}
          margin={margin}
          setMargin={setMargin}
          format={format}
          setFormat={setFormat}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default QRCodeGenerator;
