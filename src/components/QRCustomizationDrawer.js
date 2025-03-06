const QRCustomizationDrawer = ({ size, setSize, color, setColor, bgColor, setBgColor, errorCorrection, setErrorCorrection, margin, setMargin, format, setFormat, onClose }) => {
    return (
      <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 p-4 shadow-lg text-white">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
          ❌
        </button>
  
        <h2 className="text-xl mb-4 font-bold">Customization</h2>
  
        <label className="block mb-1">Size:</label>
        <select className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white" value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="150x150">150x150</option>
          <option value="300x300">300x300</option>
          <option value="500x500">500x500</option>
          <option value="700x700">700x700</option>
        </select>
  
        <label className="block mb-1">QR Color:</label>
        <input type="color" className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white" value={`#${color}`} onChange={(e) => setColor(e.target.value.substring(1))} />
  
        <label className="block mb-1">BG Color:</label>
        <input type="color" className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white" value={`#${bgColor}`} onChange={(e) => setBgColor(e.target.value.substring(1))} />
  
        <label className="block mb-1">Error Correction:</label>
        <select className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white" value={errorCorrection} onChange={(e) => setErrorCorrection(e.target.value)}>
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="Q">Quartile</option>
          <option value="H">High</option>
        </select>
  
        <label className="block mb-1">Margin Size:</label>
        <input type="number" className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white" value={margin} onChange={(e) => setMargin(e.target.value)} />
  
        <label className="block mb-1">Format:</label>
        <select className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="png">png</option>
          <option value="gif">gif</option>
          <option value="jpeg">jpeg</option>
          <option value="jpg">jpg</option>
          <option value="svg">svg</option>
        </select>
      </div>
    );
  };
  
  export default QRCustomizationDrawer;