import React from "react";
import { toast } from "react-hot-toast";

const QRButtons = ({ qrCodeUrl, format, onRemove }) => {
  // Copy functionality: fetches the image blob using the URL passed in.
  const handleCopy = async () => {
    try {
      const blob = await fetch(qrCodeUrl).then((res) => res.blob());
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      toast.success("Copied!", { duration: 2000 });
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy QR Code.");
    }
  };

  // Download functionality: downloads the image with a filename based on manifest data.
  const handleDownload = async (format) => {
    try {
      if (!qrCodeUrl) {
        toast.error("QR Code not found.");
        return;
      }
      const response = await fetch("/manifest.json");
      const manifest = await response.json();
      const projectName = manifest.short_name || "QR_Code";
      const fileName = `${projectName}.${format}`;

      const imageResponse = await fetch(qrCodeUrl);
      const blob = await imageResponse.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.success(`Downloaded as ${fileName}!`);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download QR Code.");
    }
  };

  return (
    <div className="flex overflow-hidden bg-white border divide-x rounded-lg mt-2 dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="px-4 py-2 font-medium text-gray-600 transition-colors duration-200 sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
            stroke="#1C274C"
            strokeWidth="1.5"
          />
          <path
            opacity="0.5"
            d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
            stroke="#1C274C"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {/* Download Button */}
      <button
        onClick={() => handleDownload(format)}
        className="px-4 py-2 font-medium text-gray-600 transition-colors duration-200 sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="px-4 py-2 font-medium text-gray-600 transition-colors duration-200 sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" y1="6" x2="6" y2="18" stroke="#1C274C" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" stroke="#1C274C" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default QRButtons;
