import React, { useState, useEffect, useRef } from "react";

const Filepicker = ({ selectedFile }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const pickedDataFile = async (evt) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (evt.target.files && evt.target.files.length === 1) {
      pickedFile = evt.target.files[0];
      // setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      alert("Cannot Choose more than 1 ");
      setIsValid(false);
      fileIsValid = false;
      return;
    }

    // let image;
    // const base64 = (file) => {
    //   return new Promise((resolve, reject) => {
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.onload = () => {
    //       image = fileReader.result;
    //       console.log(image);
    //       resolve(image);
    //     };
    //     fileReader.onerror = (error) => {
    //       reject(error);
    //     };
    //   });
    // };

    // let i = 0;
    // for (const property in pickedFile) {
    //   if (i < pickedFile.length) {
    //     const image = await base64(pickedFile[i]);
    //   }

    //   i = i + 1;
    // }

    // let finalImage = await base64(pickedFile);
    // setFile(finalImage);
    console.log(pickedFile);
    selectedFile(pickedFile);

    // props.onInput(props.id, images);
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
          accept=".xlsx"
          ref={filePickerRef}
          onChange={pickedDataFile}
          name="votersFile"
          // multiple
        />
        <div>
          <div>
            <div>
              {/* {props.images || file ? (
                <Carousal image={file ? file : props.images} />
              ) : null} */}

              {/* {previewUrl && (
              <img src={previewUrl} alt="Preview" className="img-thumbnail" />
            )} */}
              {/* {!previewUrl && <p className="ml-3">Upload product Image</p>} */}
            </div>
            <button
              onClick={pickImageHandler}
              className="btn btn-danger btn-sm  mt-4"
            >
              <i class="far fa-file-alt mx-1"></i>Choose File
            </button>
            {/* <Button type="button" text="Choose Image" >
            Choose Images
          </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filepicker;
