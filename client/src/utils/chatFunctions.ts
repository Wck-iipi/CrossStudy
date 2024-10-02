// Utility functions to handle message logic

export const getGeminiResponse = async (userMessage: string) => {
  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const botMessage: string = data.message;
    return botMessage;


  } catch (error) {
    console.error('Error getting bot response:', error);
    return;
    // You might want to display an error message to the user here
  }
}
