import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base64 } from "js-base64";

const ViewFile = () => {
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    const getFileData = async () => {
      const options = {
        method: "GET",
        url: "/api/file/views3",
        headers: {
          "content-type": "application/json",
        },
      };

      const res = await axios(options);

      const data = res.data;
      const base64String = data.replace(
        /^data:application\/msword;base64,/,
        ""
      );
      // const base64string_docx = data.replace(
      //   /^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/,
      //   ""
      // );
      const decodeString = atob(base64String);
      //   console.log("haha", decodeString);
      //   console.log(decodeString);

      //   console.log(
      //     Base64.decode(
      //       base64String.replace(/^data:application\/msword;base64,/, "")
      //     )
      //   );

      setFileData(base64String);
    };

    getFileData();
  }, []);

  //maybe because I upload as a doc file, what if it is docx file or pdf, will it work?
  //doc->base64->pdf
  //I have a problem to render the doc and docx base64 to pdf, don't know what the reason.
  return (
    <div>
      <embed
        src={`data:application/pdf;base64,${fileData.toString()}`}
        height="600px"
        width="800px"
      />
    </div>
  );
};

export default ViewFile;
