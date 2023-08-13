import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UploadFile = () => {
  const [file, setFile] = useState<FileList | null>();
  const router = useRouter();

  const uploadFile = async (e: FormEvent) => {
    e.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = async () => {
        const headers = {
          "content-type": "application/json",
        };

        const options = {
          method: "POST",
          url: "/api/file/s3",
          headers,
          data: { fileData: reader.result },
        };

        const response = await axios(options);

        console.log("upload response", response);
      };
    }
  };

  return (
    <div>
      <form onSubmit={(e) => uploadFile(e)}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />
        <button type="submit">Upload</button>
      </form>
      <button onClick={() => router.push("/s3/view")}>View file</button>
    </div>
  );
};

export default UploadFile;

//There are two ways to structure the Next page route, s3/upload/index.tsx or s3/upload.tsx
