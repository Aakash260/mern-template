const DocumentUpload = ({ documents, setDocuments, errors }) => {
  const handleChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const addDoc = () => {
    setDocuments([...documents, { file_name: "", file_type: "", file: null }]);
  };

  const removeDoc = (index) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold mb-3 text-lg">Documents (minimum 2) </h3>

      {documents.map((doc, index) => (
        <div
          key={index}
          className="mb-4 border p-3 rounded-lg relative bg-gray-50"
        >
          {documents.length > 1 && (
            <button
              type="button"
              onClick={() => removeDoc(index)}
              className="absolute top-2 right-2 bg-red-100 cursor-pointer text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200"
            >
              ✕
            </button>
          )}

          <input
            placeholder="File Name"
            value={doc.file_name}
            onChange={(e) => handleChange(index, "file_name", e.target.value)}
            className="border px-3 py-2 rounded w-full mb-1"
          />
          {errors[`doc_name_${index}`] && (
            <p className="text-red-500 text-sm">
              {errors[`doc_name_${index}`]}
            </p>
          )}

          <select
            value={doc.file_type}
            onChange={(e) => handleChange(index, "file_type", e.target.value)}
            className="border px-3 py-2 rounded w-full mb-1"
          >
            <option value="">Select File Type</option>
            <option value="pdf">PDF</option>
            <option value="image">Image</option>
          </select>
          {errors[`doc_type_${index}`] && (
            <p className="text-red-500 text-sm">
              {errors[`doc_type_${index}`]}
            </p>
          )}

          <input
            type="file"
            onChange={(e) => handleChange(index, "file", e.target.files[0])}
            className="border px-3 py-2 rounded w-full mb-1"
          />
          {errors[`doc_file_${index}`] && (
            <p className="text-red-500 text-sm">
              {errors[`doc_file_${index}`]}
            </p>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addDoc}
        className="  text-white px-4 py-2 rounded-lg cursor-pointer bg-[#022A5E]"
      >
        + Add Document
      </button>
    </div>
  );
};

export default DocumentUpload;
