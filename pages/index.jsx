import React, { useEffect } from 'react';
import { useState } from 'react';
import LoadingIcons from "react-loading-icons";
import Image from "next/image";
import shopifyPic from "../public/shopifyRebel.png"

export default function Home() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const clearData = (event) => {
    setData([])
    setIsLoading(false)
    event.preventDefault();
  }

  const fetchData = async () => {
    if (query) {
      setIsLoading(true);
      const res = await fetch(`/api/openai`, {
        body: JSON.stringify({
          name: query
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      if (!res.ok) {
        setIsLoading(false)
        alert(`Had an error: ${res.status} ${res.statusText}`)
        return
      }

      const newdata = await res.json();


      newdata.prompt = query;

      const newDataList = [...data, newdata];
      setData(newDataList)

      setIsLoading(false);
    } else {
      alert("Please enter a prompt.")
    }
  };

  const listOfPrompts = data.slice().reverse().map((item, index) =>
    <div className="p-5 bg-shopifysand" key={index}>
      <div className="text-shopifygreen font-semibold">Prompt: {item.prompt}</div>
      <div className="mt-1">{item.text}</div>
    </div>
  )

    React.useEffect(() => {
      const data = localStorage.getItem('my-prompt-stack')
      if(data)
        setData(JSON.parse(data))
  }, [])

    React.useEffect(() => {
      localStorage.setItem('my-prompt-stack',JSON.stringify(data))
    })

  return (
    <div className="grid lg:grid-cols-2 lg:h-screen">

      <div className="lg:shadow-xl z-10">
        <div className="relative flex sm:min-h-screen flex-col sm:justify-center overflow-hidden shadow-outline bg-shopifygray ">
          <div className="relative bg-shopifyslate px-6 pt-10 pb-8 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">

            <div className="mx-auto max-w-md">
              <Image src={shopifyPic} alt="Shopify Rebellion Logo" layout="fixed" width="40px" height="50px" /> 
              <p className="text-6xl font-semibold text-shopifywhite inline">Shopify</p>
              <div className="divide-y">
                <div className="py-2 text-base leading-7 text-shopifywhite">
                  <p>Send a prompt to GPT-3&apos;s Completions API!</p>
                </div>

                <form className="mt-0">
                  <label htmlFor="prompt" className="block text-gray-500 text-sm font-bold mb-2 mt-6">
                    Prompt
                  </label>

                  <textarea
                    id="prompt"
                    onChange={event => setQuery(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4">
                  </textarea>

                  <div className="flex items-center gap-4 mt-1">
                    <button
                      className="bg-shopifylgreen hover:bg-shopifygreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() =>
                        fetchData()
                      }

                    >
                      Submit
                    </button>
                    <button className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
                      onClick={(e) => clearData(e)}>
                      Clear Prompts
                    </button>
                  </div>


                </form>
              </div>
            </div>
          </div>
        </div >
      </div>

      <div className="bg-shopifygray overflow-y-auto">
        <div className="bg-shopifyslate p-5 sticky top-0 shadow-md">
          <div className="flex flex-row items-center">
            <h4 className="text-lg font-semibold text-shopifysand">Recent Prompts</h4>
            {isLoading ? <LoadingIcons.ThreeDots className="ml-1.5" width="40px" fill="white" /> : null}
          </div>
        </div>

        <div className="divide-y">
          {listOfPrompts}
        </div>
``
      </div>
    </div>

  );
}

