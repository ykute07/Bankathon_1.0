import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useState,
    memo,
    useRef,
    ChangeEvent
  } from "react";
  import axios from "axios";
  import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
  import { compact } from "lodash";
  
  import LoadingText from "./LoadingText";
  import { FileLite } from "@/types/file";
  import FileViewerList from "./FileViewerList";
  
function TextInputArea() {
const [isOpen, setIsOpen] = useState(false);
const [title, setTitle] = useState('');
const [text, setText] = useState('');
const [error, setError] = useState('');

const handleButtonClick = () => {
    setIsOpen(true);
    setTitle('');
    setText('');
    setError('');
};


const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  

const handleSubmit = () => {
    if (title.trim() === '') {
    setError('Please enter job title.');
    return;
    }

    if (text.trim() === '') {
    setError('Please enter job details.');
    return;
    }
    
    // Process the submitted title and text (e.g., send them to a server, update state, etc.)

    handleFileUpload();

    setIsOpen(false);
    setTitle('');
    setText('');
    setError('');
};

const handleFileUpload = async () => {
    const data = { title, text };
    const json = JSON.stringify(data);

    try {
      const response = await fetch('https://api.hriq.ai/text/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: json,
      });

      // Process the response as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle the error
    }
  };

const handleClose = () => {
setIsOpen(false); 
};

return (
    <div>
    {!isOpen && (
        <button
        className={`w-[240px] border-[#F7F5E9] border-opacity-80 text-black px-[5px] py-[5px] rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-[#252425]  font-semibold bg-[#F7F5E9]`}
        onClick={handleButtonClick}
        >
        Add Job Description
        </button>
    )}

    {isOpen && (
        <div className={`w-[240px] border-[#F7F5E9] border-opacity-80 text-black px-[5px] py-[5px] rounded-lg font-semibold bg-[#F7F5E9]`}>

            <div>
                <label htmlFor="title-input" className="flex flex-col items-center justify-center text-black">
                <span className="font-semibold items-center justify-center">Job Title</span>
                <input
                    id="title-input"
                    type="text"
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Paste job title"
                />
                </label>
            </div>

            <div className="mt-4">
                <label htmlFor="text-box" className="flex flex-col items-center justify-center text-black">
                <span className="font-semibold items-center justify-center">Details</span>
                <textarea
                    id="text-box"
                    className="resize-none w-full h-300 mt-2 p-2 border border-gray-300 rounded"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Paste job details"
                ></textarea>
                </label>
            </div>

        {error && (
            <div className="flex items-center justify-center w-full mt-4">
            <p className="text-sm text-red-500">{error}</p>
            </div>
        )}

        <div className="flex items-center justify-center w-full mt-4">
            <button 
            className="bg-[#97D8D2] text-black px-4 py-2 mr-2 rounded"
            onClick={handleClose}>Close</button>
            
            <button
            className="bg-[#7AEA8E] text-black px-4 py-2 ml-2 rounded"
            onClick={handleSubmit}> Submit </button>
        </div>
        </div>
    )}
    </div>
);
}

export default TextInputArea;