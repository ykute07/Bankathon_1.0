import React, { useEffect, useState, useRef } from 'react';
//import './button.css';

function ButtonCarousel() {
  const [buttonData, setButtonData] = useState<{ id: number; text: string; }[]>([]);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDataFromBackend().then(data => {
      setButtonData(data);
    }).catch(error => {
      console.error('Error:', error);
      // Handle the error
    });
  }, []);

  useEffect(() => {
    startButtonCarousel();
  }, [buttonData]);

  const startButtonCarousel = () => {
    const buttonContainer = buttonContainerRef.current;
    if (buttonContainer) {
      const buttonsWidth = buttonContainer.scrollWidth;
      const carouselWidth = buttonContainer.offsetWidth;

      if (buttonsWidth > carouselWidth) {
        const animationDuration = buttonsWidth / 100; // Adjust the value to control the carousel speed
        buttonContainer.style.animation = `carousel-animation ${animationDuration}s linear infinite`;
      } else {
        buttonContainer.style.animation = 'none';
      }
    }
  };

  const fetchDataFromBackend = async () => {
    // Replace this with your actual API call or function to fetch the button data from the backend
    // Example: const response = await fetch('http://your-api-endpoint');
    // Parse the response and return the button data
    // Example: const data = await response.json();
    // return data;

    // For now, let's use a mock data array
    return [
      { id: 1, text: 'What candidates have the most skills related to the job description?' },
      { id: 2, text: 'List candidates with leadership experience.' },
      { id: 3, text: 'What candidates have worked in react.js?' },
      { id: 4, text: 'Generate a framework for evaluating candidates during interview.' },
    ];
  };

  const handleButtonClick = async (buttonText : unknown) => {
      const data = { buttonText };
      const json = JSON.stringify(data);

    //   try {
    //     const response = await fetch('https://api.hriq.ai/chat/', {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: json,
    //     });

    //     // Process the response as needed
    //   } catch (error) {
    //     console.error('Error:', error);
    //     // Handle the error
    //   }
    };
 // rounded-lg font-semibold
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[200%] h-10 relative"
        ref={buttonContainerRef}
      >
        <div className="w-[300%] flex items-center h-20 justify-between absolute left-0 animate gap-1 animate-carousel">
          {buttonData.map((button) => (
            <div className="flex justify-center items-start w-[20rem]" key={button.text}>
              <button
                className="carousel-button px-[12px] py-[6px] rounded-lg hover:bg-[#E0A0D4] hover:bg-opacity-80 font-semibold hover:text-[#252425]"
                onClick={() => handleButtonClick(button.text)}
                style={{ whiteSpace: 'nowrap', border: '1px solid black',}}
              >
                  
                {button.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ButtonCarousel;