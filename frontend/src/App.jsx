import { useState } from "react";
import InputField from "../components/InputFields";
import AddressForm from "../components/AddressForm";
import DocumentUpload from "../components/DocumentUpload";
import Header from "../components/Header";
import { validateUserForm } from "./utils/validateUserForm";
const UserForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    same_as_residential: false,
  });

  const [errors, setErrors] = useState({});
  const [resAddress, setResAddress] = useState({});
  const [permAddress, setPermAddress] = useState({});
  const [documents, setDocuments] = useState([
    { file_name: "", file_type: "", file: null },
  ]);
  const [documentsKey, setDocumentsKey] = useState(0);

  const validate = () => {
    const newErrors = validateUserForm({
      form,
      resAddress,
      permAddress,
      documents,
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();

    documents.forEach((doc) => {
      formData.append("documents", doc.file);
    });

    const data = {
      ...form,
      residential_address: resAddress,
      permanent_address: form.same_as_residential ? resAddress : permAddress,
      documents: documents.map((d) => ({
        file_name: d.file_name,
        file_type: d.file_type,
      })),
    };

    formData.append("data", JSON.stringify(data));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submit`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || result.error || "Request failed");
      } else {
        alert("Submitted successfully!");

        setForm({
          first_name: "",
          last_name: "",
          email: "",
          dob: "",
          same_as_residential: false,
        });

        setResAddress({});
        setPermAddress({});
        setDocuments([{ file_name: "", file_type: "", file: null }]);
        setDocumentsKey((k) => k + 1);
        setErrors({});
      }
    } catch (err) {
      console.error("err", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="w-full p-6 md:grid md:grid-cols-2 md:gap-x-10 ">
        <div>
          <InputField
            label="First Name"
            required="true"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name}</p>
          )}
        </div>

        <div>
          <InputField
            required="true"
            label="Last Name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name}</p>
          )}
        </div>

        <div>
          <InputField
            required="true"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <InputField
            required="true"
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <label className="flex items-center gap-2 col-span-2 cursor-pointer mb-2">
          <input
            type="checkbox"
            name="same_as_residential"
            checked={form.same_as_residential}
            onChange={handleChange}
          />
          Same as Residential
        </label>

        <div>
          <AddressForm
            title="Residential Address"
            address={resAddress}
            setAddress={setResAddress}
          />
          {errors.residential && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.residential}
            </p>
          )}
        </div>

        <div>
          {!form.same_as_residential && (
            <div>
              <AddressForm
                title="Permanent Address"
                address={permAddress}
                setAddress={setPermAddress}
              />
              {errors.permanent && (
                <p className="text-red-500 text-sm col-span-2">
                  {errors.permanent}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="col-span-2">
          <DocumentUpload
            key={documentsKey}
            documents={documents}
            setDocuments={setDocuments}
            errors={errors}
          />
          {errors.documents && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.documents}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 mt-4 rounded-lg col-span-2 w-fit mx-auto
          text-white bg-[#022A5E] font-bold hover:bg-blue-900 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserForm;
