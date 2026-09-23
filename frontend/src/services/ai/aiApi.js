const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5003";

const sendAIMessage = async (message) => {
  if (!message?.trim()) {
    throw new Error("Message is required");
  }

  const response = await fetch(
    `${API_URL}/api/ai/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: message.trim(),
      }),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "AI response failed"
    );
  }

  return data;
};

export {
  sendAIMessage,
};