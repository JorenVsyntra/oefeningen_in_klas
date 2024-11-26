async function generateContent() {
    const apiKey = 'AIzaSyDXwms_MVc2YBYxkI8VHhPzzfbca59aRIo'; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDXwms_MVc2YBYxkI8VHhPzzfbca59aRIo}`;
  
    const requestBody = 
    {
        "contents": [
          {
            "parts": [
              {
                "text": "give me the goods and the bads from autonomous driving technology (robotaxi)"
                      }
            ]
          }
        ]
      }      
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Request failed', error);
    }
  
  
  generateContent();
  }