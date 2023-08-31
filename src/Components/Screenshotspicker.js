import React, { useState, useEffect, useRef } from "react";

const Screenshotpicker = ({ selectedFile }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const pickedImage = async (evt) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (evt.target.files && evt.target.files.length >= 1) {
      pickedFile = evt.target.files;
      // setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid(false);
    }

    let images = [];
    const base64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          images.push(fileReader.result);
          resolve(images);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    let i = 0;
    for (const property in pickedFile) {
      if (i < pickedFile.length) {
        const image = await base64(pickedFile[i]);
      }

      i = i + 1;
    }
    setFile(images);

    selectedFile(images);
  };

  const pickImageHandler = (evt) => {
    filePickerRef.current.click();
  };

  const filePickerRef = useRef();
  return (
    <div>
      <div>
        <input
          //   id={props.id}
          style={{ display: "none" }}
          type="file"
          accept=".jpg , .png , .jpeg"
          ref={filePickerRef}
          onChange={pickedImage}
          name="votersFile"
          multiple
        />
        <div>
          <div>
            <button
              style={{
                color: "#FFFFFF",
                backgroundColor: "#d12e2f",
                // width: "124.9px",
                height: "35px",
              }}
              onClick={pickImageHandler}
              className="btn btn-sm  px-3 py-2"
            >
              <i class="far fa-file-alt mx-1"></i> Attach Screenshots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screenshotpicker;
