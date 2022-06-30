import React from "react";
import Header from "../../Components/Header";
import Filepicker from "../../Components/Filepicker";
import { uploadData } from "../../Connection/Upload";
import { ToastContainer, toast } from "react-toastify";

const Upload = () => {
  const [uploading, setUploading] = React.useState(false);
  const selectedFile = async (fileData) => {
    setUploading(true);
    console.log(fileData);
    const data = new FormData();
    data.append("file", fileData);

    let responseServer = await uploadData(data, (res) => {
      // console.log(responseServer);
      console.log(res);
      if (res.data.success === true) {
        toast.success("Data is Saved to both Aristotle and Finiks Database", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setUploading(false);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setUploading(false);
      }
    });
  };
  return (
    <div style={{ backgroundColor: "#FCFCFC", height: "100%" }}>
      <div className="container mt-5">
        <br />
        <div className="mt-4">
          <div className="row">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md 10">
              <Header name="Upload Data" />
              <div
                style={{
                  height: "300px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                }}
                className="shadow p-4"
              >
                <div
                  style={{
                    height: "100%",
                    border: "1px dashed #d12e2f",
                    borderRadius: "12px",
                  }}
                  className=" p-4"
                >
                  <i class="fas fa-upload " style={{ fontSize: "75px" }}></i>
                  <br />
                  {uploading === false && (
                    <Filepicker selectedFile={selectedFile} />
                  )}

                  {uploading === true && (
                    <div>
                      <button
                        class="btn btn-danger my-3"
                        type="button"
                        disabled
                      >
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Loading...</span>
                      </button>
                      <p>Your Data is Uploading to the Cloud Database</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
