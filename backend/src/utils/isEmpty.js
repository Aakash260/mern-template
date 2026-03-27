import fs from "fs";
const isEmpty = (value) => {
  return !value || value.toString().trim() === "";
};

const deleteFiles = (files) => {
  files?.forEach((file) => {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  });
};

export { isEmpty, deleteFiles };
