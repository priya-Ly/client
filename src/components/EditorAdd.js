import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
// import SimpleImage from "@editorjs/simple-image";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import axios from "axios";

function EditorAdd() {
  const ejInstance = useRef();
  const [content, setContent] = useState("");
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        // Editor is ready, now we can add event listeners
        const svaeBtn = document.querySelector("button.save-btn");
        svaeBtn.addEventListener("click", () => {
          editor
            .save()
            .then((data) => console.log(data, "ddd"))
            .catch((error) => console.log(error, "error"));
        });

        // Store the editor instance
        ejInstance.current = editor;
      },

      autofocus: true,
      onChange: async () => {
        let content = await editor.save();
        console.log(content);
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: ["link", "bold"],
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        // image: SimpleImage,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch(
                  "http://localhost:7000/blogLy/api/upload",
                  {
                    method: "POST",
                    body: formData,
                    headers: {
                      // No need to set Content-Type, it will be automatically set by FormData
                      // "Content-Type": "multipart/form-data",
                    },
                    withCredentials: false,
                  }
                );
                console.log(response, "resp");
                if (response.ok) {
                  const resData = await response.json();
                  if (resData.success === 1) {
                    console.log(resData.file.url, "file");
                    return resData;
                  }
                } else {
                  console.error("Image upload failed:", response.status);
                  // Handle the error accordingly
                }
              },
              async uploadByUrl(url) {
                const response = await axios.post(
                  "http://localhost:7000/blogLy/uploadUrl",
                  {
                    url,
                  }
                );
                if (response.data.success === 1) {
                  console.log(response.data, "dddd");
                  return response.data;
                }
              },
            },
          },
        },
      },
    });
    let svaeBtn = document.querySelector("button");
    svaeBtn.addEventListener("click", function () {
      editor
        .save()
        .then((data) => console.log(data, "ddd"))
        .catch((error) => console.log(error, "error"));
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);
  return (
    <div>
      <div id="editorjs"></div>
      <button className="save-btn">Save</button>
    </div>
  );
}

export default EditorAdd;
