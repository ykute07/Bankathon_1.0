import React, { memo, useState } from 'react';

function FileDownloadArea() {
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch('https://api.hriq.ai/report', {
        method: 'GET',
      });

      if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        setDownloadLink(downloadUrl);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Want to make it so that button only shows up when the report is available

  // temp - show button for frontend edits

  return (
    <div>
        <div className="flex flex-row items-center justify-center">
        {downloadLink ? (
            <a href={downloadLink} download="report.pdf" className={`flex flex-col items-center justify-center w-[240px] border-[#F7F5E9] border-opacity-80 text-black px-[5px] py-[5px] rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-[#252425] font-semibold bg-[#F7F5E9]`}>
            Download Report
            </a>
        ) : null} 
            <a href={downloadLink} download="report.pdf" className={`flex flex-col items-center justify-center w-[240px] border-[#F7F5E9] border-opacity-80 text-black px-[5px] py-[5px] rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-[#252425] font-semibold bg-[#F7F5E9]`}>
            Download Report
            </a>
        </div>
    </div>
  );
}

export default memo(FileDownloadArea);