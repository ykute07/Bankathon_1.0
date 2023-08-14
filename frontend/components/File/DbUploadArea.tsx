import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useState,
    memo,
    useRef,
  } from "react";
  import axios from "axios";
  import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
  import { compact } from "lodash";
  
  import LoadingText from "./LoadingText";
  import { FileLite } from "@/types/file";
  import FileViewerList from "./FileViewerList";
  
  type FileUploadAreaProps = {
    handleSetFiles: Dispatch<SetStateAction<FileLite[]>>;
    maxNumFiles: number;
    maxFileSizeMB: number;
  };
  
  function DbUploadArea(props: FileUploadAreaProps) {
    const handleSetFiles = props.handleSetFiles;
  
    const [files, setFiles] = useState<FileLite[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const dropzoneRef = useRef<HTMLLabelElement>(null);
  
    const handleFileChange = useCallback(
      async (selectedFiles: FileList | null) => {
        if (selectedFiles && selectedFiles.length > 0) {
          setError("");
  
          if (files.length + selectedFiles.length > props.maxNumFiles) {
            setError(`You can only upload up to ${props.maxNumFiles} files.`);
            if (dropzoneRef.current) {
              (dropzoneRef.current as any).value = "";
            }
            return;
          }
  
          setLoading(true);
  
          const uploadedFiles = await Promise.all(
            Array.from(selectedFiles).map(async (file) => {
              // Check the file type
              if (
                file.type.match(
                  /(text\/plain|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)|text\/(markdown|x-markdown))/
                ) && // AND file isn't too big
                file.size < props.maxFileSizeMB * 1024 * 1024
              ) {
                // Check if the file name already exists in the files state
                if (files.find((f) => f.name === file.name)) {
                  return null; // Skip this file
                }
  
                const formData = new FormData();
                formData.append("file", file);
                formData.append("filename", file.name);
  
                try {
                  const processFileResponse = await axios.post(
                    "/api/process-file",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
  
                  if (processFileResponse.status === 200) {
                    const text = processFileResponse.data.text;
                    const meanEmbedding = processFileResponse.data.meanEmbedding;
                    const chunks = processFileResponse.data.chunks;
  
                    const fileObject: FileLite = {
                      name: file.name,
                      url: URL.createObjectURL(file),
                      type: file.type,
                      size: file.size,
                      expanded: false,
                      embedding: meanEmbedding,
                      chunks,
                      extractedText: text,
                    };
                    console.log(fileObject);
  
                    return fileObject;
                  } else {
                    console.log("Error creating file embedding");
                    return null;
                  }
                } catch (err: any) {
                  console.log(`Error creating file embedding: ${err}`);
                  return null;
                }
              } else {
                alert(
                  `Invalid file type or size. Only TXT, PDF, DOCX or MD are allowed, up to ${props.maxFileSizeMB}MB.`
                );
                return null; // Skip this file
              }
            })
          );
  
          // Filter out any null values from the uploadedFiles array
          const validFiles = compact(uploadedFiles);
  
          // Set the files state with the valid files and the existing files
          setFiles((prevFiles) => [...prevFiles, ...validFiles]);
          handleSetFiles((prevFiles) => [...prevFiles, ...validFiles]);
  
          setLoading(false);
        }
      },
      [files, handleSetFiles, props.maxFileSizeMB, props.maxNumFiles]
    );
  
    const handleDragEnter = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      setDragOver(true);
    }, []);
  
    const handleDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
    }, []);
  
    const handleDragLeave = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      setDragOver(false);
    }, []);
  
    const handleDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        setDragOver(false);
        const droppedFiles = event.dataTransfer.files;
        handleFileChange(droppedFiles);
      },
      [handleFileChange]
    );
  
    return (
      <div className="flex items-center justify-center w-full flex-col">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col shadow items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative ${
            dragOver ? "border-blue-500 bg-blue-50" : ""
          }`}
          ref={dropzoneRef}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {loading ? (
              <LoadingText text="Uploading..." />
            ) : (
              <div className="text-gray-500 flex flex-col items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M10 1c3.866 0 7 1.79 7 4s-3.134 4-7 4-7-1.79-7-4 3.134-4 7-4zm5.694 8.13c.464-.264.91-.583 1.306-.952V10c0 2.21-3.134 4-7 4s-7-1.79-7-4V8.178c.396.37.842.688 1.306.953C5.838 10.006 7.854 10.5 10 10.5s4.162-.494 5.694-1.37zM3 13.179V15c0 2.21 3.134 4 7 4s7-1.79 7-4v-1.822c-.396.37-.842.688-1.306.953-1.532.875-3.548 1.369-5.694 1.369s-4.162-.494-5.694-1.37A7.009 7.009 0 013 13.179z" clipRule="evenodd" />
                </svg>
                <p className="mb-2 text-sm">
                    Create new
                  <span className="font-semibold"> database connection</span>
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(event) => handleFileChange(event.target.files)}
                />
              </div>
            )}
          </div>
        </label>
  
        {error && (
          <div className="flex items-center justify-center w-full mt-4">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
  
        <FileViewerList files={files} title="Uploaded Files" />
      </div>
    );
  }
  
  export default memo(DbUploadArea);
  