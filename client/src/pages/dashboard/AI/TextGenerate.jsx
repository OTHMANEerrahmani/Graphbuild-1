import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useCookies } from "react-cookie";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaCopy } from "react-icons/fa";

function TextGenerate() {
  const [cookies] = useCookies(["access-token"]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const [prompt, setPrompt] = useState("");

  const scrollRef = useRef(null);

  const handleRequest = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(prompt);
      const response = await result.response;

      const text = response.text();
      setChatHistory((prevListData) => [...prevListData, { prompt, text }]);
      setLoading(false);
      setPrompt("");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setChatHistory([]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatHistory]);

  return (
    <>
      <>
        <div className="mx-auto py-2 gap-2 w-full px-4 space-y-2 text-black dark:text-white  no-scrollbar">
          <div className="flex flex-col md:flex-row space-x-2 space-y-2 py-4 items-center">
            <input
              type="text"
              className="input w-full rounded-full"
              placeholder="Generate a Something"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="font-medium  rounded-full px-6 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black hover:underline"
              onClick={() => {
                handleRequest();
              }}
            >
              Generate
            </button>
          </div>
          <div className=" flex flex-col items-center justify-center space-y-2 ">
            <div className="flex flex-row w-full justify-end">
              {chatHistory.length > 0 && (
                <button
                  className="font-medium  rounded-full px-6 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black hover:underline"
                  onClick={() => {
                    handleClear();
                  }}
                >
                  Clear Chat
                </button>
              )}
            </div>

            {chatHistory.length > 0 && (
              <div className="h-[calc(60vh)] w-full overflow-auto no-scrollbar">
                {chatHistory.map((item, index) => {
                  return (
                    <div
                      key={index}
                      ref={index === chatHistory.length - 1 ? scrollRef : null}
                      className="px-4 py-2 "
                    >
                      <div className="font-medium py-2 ">{item.prompt}</div>
                      <div className="font-normal px-4">
                        <ReactMarkdown>{item.text}</ReactMarkdown>
                      </div>
                      <div className="flex space-x-2 px-4 py-2 ">
                        <FaCopy
                          size={"10px"}
                          onClick={() => {
                            copyText(item.text);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {loading && (
              <div className="flex flex-row justify-center items-center w-full font-medium text-xl text-black dark:text-white">
                Loading...
              </div>
            )}
            {error && (
              <div className="flex flex-col justify-center items-center w-full font-medium text-2xl text-black dark:text-white">
                Error <span className="text-red-600">{error.message}</span>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default TextGenerate;
