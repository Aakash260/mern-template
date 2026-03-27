export const validateUserForm = ({
  form,
  resAddress,
  permAddress,
  documents,
}) => {
  let newErrors = {};

  if (!form.first_name?.trim()) {
    newErrors.first_name = "First name is required";
  }

  if (!form.last_name?.trim()) {
    newErrors.last_name = "Last name is required";
  }

  if (!form.email?.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors.email = "Invalid email";
  }

  if (!form.dob) {
    newErrors.dob = "DOB is required";
  } else {
    const age = new Date().getFullYear() - new Date(form.dob).getFullYear();

    if (age < 18) {
      newErrors.dob = "Must be at least 18 years old";
    }
  }

  if (!resAddress.street_one?.trim() || !resAddress.street_two?.trim()) {
    newErrors.residential = "Residential address required";
  }

  if (!form.same_as_residential) {
    if (!permAddress.street_one?.trim() || !permAddress.street_two?.trim()) {
      newErrors.permanent = "Permanent address required";
    }
  }

  if (!documents || documents.length < 2) {
    newErrors.documents = "Minimum 2 documents required";
  }

  documents.forEach((doc, index) => {
    if (!doc.file_name?.trim()) {
      newErrors[`doc_name_${index}`] = "File name required";
    }

    if (!doc.file_type?.trim()) {
      newErrors[`doc_type_${index}`] = "File type required";
    }

    if (!doc.file) {
      newErrors[`doc_file_${index}`] = "File upload required";
    }

    if (doc.file && doc.file_type) {
      if (doc.file_type === "pdf" && doc.file.type !== "application/pdf") {
        newErrors[`doc_file_${index}`] = "Upload a PDF file";
      }

      if (
        doc.file_type === "image" &&
        !["image/png", "image/jpeg"].includes(doc.file.type)
      ) {
        newErrors[`doc_file_${index}`] = "Upload a valid image";
      }
    }
    if (doc.file) {
      const allowed = ["application/pdf", "image/png", "image/jpeg"];
      if (!allowed.includes(doc.file.type)) {
        newErrors[`doc_file_${index}`] = "Only PDF or Image allowed";
      }
    }
  });

  return newErrors;
};
