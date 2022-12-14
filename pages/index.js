import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loader, setloader] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setloader("Wait while we generate your image!");
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    setResult(res.data.data[0].url);
    setloader(" ");
  };

  return (
    <div className="flex-wrapper">
      <>
        <h2 className="h2-primary">Generate an Image using Open AI API</h2>

        <textarea
          className="textarea"
          placeholder="Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
          onChange={(e) => setPrompt(e.target.value)}
          rows="5"
          cols="40"
        />
        <br />
        <button className="btn" onClick={generateImage}>
          Generate an Image
        </button>
        <br />
        {result.length > 0 ? (
          <img className="mt-6 w-350" src={result} alt="result" />
        ) : (
          <></>
        )}
        <p>{loader}</p>
      </>
    </div>
  );
}

export default App;
