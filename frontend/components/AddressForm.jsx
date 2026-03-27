import InputField from "./InputFields";

const AddressForm = ({ title, address, setAddress }) => {
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white mb-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <InputField
        label="Street One"
        name="street_one"
        value={address.street_one || ""}
        onChange={handleChange}
      />

      <InputField
        label="Street Two"
        name="street_two"
        value={address.street_two || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddressForm;
