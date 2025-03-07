import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import ParticlesBackground from "./ParticlesBackground";
import QRCustomizationDrawer from "./QRCustomizationDrawer";
import Loader from "./Loader";
import QRButtons from "./QRButtons";
import Button from "./Button";

const QRCodeGenerator = () => {
  // State for user input and generated QR code object.
  // currentQR will hold { id, inputText, qrCodeUrl, size, format }
  const [inputText, setInputText] = useState("");
  const [currentQR, setCurrentQR] = useState(null);

  // QR code appearance settings.
  const [size, setSize] = useState("300x300");
  const [color, setColor] = useState("000000");
  const [bgColor, setBgColor] = useState("ffffff");

  // Additional customization attributes.
  const [errorCorrection, setErrorCorrection] = useState("L");
  const [margin, setMargin] = useState(4);
  const [format, setFormat] = useState("png");

  // Control the drawer and loading state.
  const [isGenerating, setIsGenerating] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Local history state – holds previous generated QR objects.
  const [qrHistory, setQrHistory] = useState([]);

  // On mount, load saved history from localStorage.
  useEffect(() => {
    const storedHistory = localStorage.getItem("qrHistory");
    if (storedHistory) {
      setQrHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Function to generate a new QR code.
  // When the user clicks Generate, the QR is created after a simulated delay.
  // The generated QR (with its details) is automatically added to the history.
  const generateQRCode = () => {
    if (!inputText) return;
    setIsGenerating(true);
    setTimeout(() => {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&color=${color}&bgcolor=${bgColor}&data=${encodeURIComponent(
        inputText
      )}&ecc=${errorCorrection}&margin=${margin}&format=${format}`;
      const newQR = {
        id: Date.now(),
        inputText,
        qrCodeUrl: apiUrl,
        size,
        format,
      };
      setCurrentQR(newQR);
      setIsGenerating(false);
      // Auto-save the generated QR into history.
      setQrHistory((prev) => {
        const updated = [newQR, ...prev];
        localStorage.setItem("qrHistory", JSON.stringify(updated));
        return updated;
      });
      toast.success("QR Code generated and saved!");
    }, 3000);
  };

  // Remove button in the preview clears the current QR and removes it from history.
  const removeCurrentQR = () => {
    if (currentQR) {
      setQrHistory((prev) => {
        const updated = prev.filter((item) => item.id !== currentQR.id);
        localStorage.setItem("qrHistory", JSON.stringify(updated));
        return updated;
      });
      setCurrentQR(null);
      toast.success("QR Code removed from preview and history.");
    }
  };

  // Remove a specific QR from local history.
const removeHistoryItem = (index) => {
  const updatedHistory = [...qrHistory];
  updatedHistory.splice(index, 1);
  setQrHistory(updatedHistory);
  localStorage.setItem("qrHistory", JSON.stringify(updatedHistory));
  toast.success("QR Code removed from history.", {icon: "🗑️"});
};


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter text or URL (Max 300 chars)"
        maxLength={300}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
      />

      {/* Generate Button appears when there is some input and not already generating */}
      {inputText && !isGenerating && (
        <div className="mt-4">
          <Button onClick={generateQRCode}>Generate QR Code</Button>
        </div>
      )}

      {/* Preview Section: Shows loader while generating; otherwise, shows the generated QR image */}
      {(isGenerating || currentQR) && (
        <div
          className="mt-4 flex flex-col items-center justify-center bg-white rounded shadow-md p-4"
          style={{
            width: `${size.split("x")[0]}px`,
            height: `${size.split("x")[1]}px`,
          }}
        >
          {isGenerating ? (
            <Loader size={size} color={color} bgColor={bgColor} />
          ) : (
            currentQR && (
              <img
                id="qrCodeImage"
                src={currentQR.qrCodeUrl}
                alt="Generated QR Code"
                onError={() => toast.error("Failed to load QR Code.")}
              />
            )
          )}
        </div>
      )}

      {/* Action Buttons for the preview:
          - Copy: Copy the QR image to clipboard.
          - Download: Download the QR with project name and format.
          - Remove: Remove the current QR (preventing it from being saved) */}
      {currentQR && !isGenerating && (
        <QRButtons
          format={format}
          qrCodeUrl={currentQR.qrCodeUrl}
          onRemove={removeCurrentQR}
        />
      )}

      {/* Customization Drawer Toggle */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="fixed top-4 right-4 bg-gray-700 p-2 rounded"
      >
        ⚙ Customize
      </button>

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

     {/* History Listing: Shows previously generated QRs */}
{qrHistory.length > 0 && (
  <div className="mt-8 w-full px-4">
    <h2 className="text-2xl font-semibold mb-4">QR Code History</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {qrHistory.map((item, index) => (
        <div
          key={item.id}
          className="flex border border-gray-700 rounded-lg p-4 bg-gray-800 text-white shadow-md"
        >
          {/* Thumbnail */}
          <div className="w-1/3">
            <img
              src={item.qrCodeUrl}
              alt="QR Code"
              className="w-full object-contain rounded"
            />
          </div>
          {/* Details */}
          <div className="w-2/3 pl-4 flex flex-col justify-center">
            <p className="text-sm mb-2">
              <span className="font-semibold">Text:</span>{" "}
              {item.inputText.length > 50
                ? item.inputText.substring(0, 50) + "..."
                : item.inputText}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Size:</span> {item.size}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Format:</span> {item.format}
            </p>
            <button
              onClick={() => removeHistoryItem(index)}
              className="mt-2 text-xs text-red-400 hover:underline self-start"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      <Toaster />
    </div>
  );
};

export default QRCodeGenerator;
