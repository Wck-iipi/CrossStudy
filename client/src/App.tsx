
import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string>("");

  const callGemini = async () => {
    if (!inputValue) {
      return; // Prevent empty messages
    }

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      });
      const message = await response.json();


      if (!response.ok) {
        throw new Error(`Error sending message: ${response.statusText}`);
      }

      const outputElement = document.getElementById('output');
      if (outputElement) {
        outputElement.innerHTML += `Gemini called with input: ${inputValue}<br/>`;
        outputElement.innerHTML += `Gemini response: ${await message.message}<br/><br/>`;
      }

      // Handle successful response (optional):
      // const data = await response.json();
      // console.log('Server response:', data);

      // Clear input after successful submission (optional):
      setInputValue('');
    } catch (error) {
      console.error('Error:', error);
      // Optionally display an error message to the user
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <h1>Hello world</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={callGemini}>Submit</button>
      <div className="output" id="output"></div>
    </>
  );
}

export default App;
