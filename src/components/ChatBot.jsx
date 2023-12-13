import { useRef, useState } from "react";

export const ChatBot = () => {
    const [readMore, setReadMore] = useState(false);
    const [question, setQuestion] = useState("");
    const [resAIBot, setResAIBot] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const refValue = useRef(null);    

    const handleAskAIBot = (e) => {
        e.preventDefault();
	    refValue.current.value = '';
	    refValue.current.scrollIntoView({ behavior: "smooth" });
        setResAIBot(null);
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ prompt: question })
        }).then(res => res.json()).then(data => {
            setResAIBot(data);
            setIsLoading(false);
        })
    }

    return (
        <div className="xl:w-[50%]" >
            <div className="mt-8 mx-6 sm:mx-10">
                <div className="flex items-center">
                    <img className="rounded-full border p-2 border-gray-700" width="50" height="50" src="https://img.icons8.com/ios/50/artificial-intelligence.png" alt="artificial-intelligence"/>
                    <h1 className="ml-4 text-black text-3xl font-extrabold border-b-2 pb-2 border-black sm:text-4xl">Biology Assistant</h1> 
                </div>

                <button className="hover:bg-green-600 hover:text-white mt-4 bg-white rounded-full p-1 px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:hidden text-green-600 font-semibold text-sm"
                onClick={e => setReadMore(!readMore)}>
                    <h1>More ...</h1>
                </button>

                <div className={ readMore ? "flex flex-col gap-6 mt-8" : 
                                  "hidden lg:flex flex-col gap-6 mt-8"
                                }>
                    <p className="border-l-2 border-black pl-2  text-gray-900 font-medium text-base">
                    <strong className="underline text-green-600">Biology Assistant</strong> este un sistem AI Language de tip chat în domeniul biologiei care poate efectua o serie de operațiuni pentru a oferi utilizatorilor informații, asistență și interacțiune în contextul biologiei. Chatul este un 3rd party app ce folosesti un api pentru a accesa Modelul <strong className="text-green-600 underline">V3-Beta HercAI</strong> bazat pe modelul <strong className="text-green-600 underline">GPT-4</strong>. 
                    </p>
                </div> 
            </div>

            <div className="mt-10 mx-6 mb-10 sm:mx-36 lg:mt-20 lg:mx-52 xl:mx-24 2xl:mx-40">
                <form className="flex flex-col gap-4" onSubmit={e => handleAskAIBot(e)}>
                    <label className="text-3xl font-bold text-center text-green-600 underline.">Ai o intrebare ? </label>
                    <div className="flex items-center bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-3 text-green-700 leading-tight focus:outline-none">

                        <img width="30" height="30" src="https://img.icons8.com/ios/50/000000/message-bot.png" alt="message-bot"/>
                        <input type="text" className="mx-3 h-fit focus:outline-none w-full" placeholder="Cum pot sa te ajut ... " onChange={e => setQuestion(e.target.value)} ref={refValue}/>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-black w-8 h-8 p-1 border aspect-square rounded-lg hover:bg-gray-200 hover:border hover:border-gray-400"
                        onClick={e => handleAskAIBot(e)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>

                    </div>
                </form>

                {
                    isLoading && <div role="status" className="flex justify-center items-center mt-10 sm:mt-20 md:mt-40">
                            <svg aria-hidden="true" className="inline w-28 h-28 text-slate-100 animate-spin fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                }

                {
                    resAIBot && <div className="rounded-xl bg-green-600 p-4 mt-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">

                        <div className="bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-lg font-semibold p-2 rounded-md flex">
                            <h1 className="px-2 bg-green-600 text-white rounded-md absolute">User</h1>
                            <h1 className="ml-16 text-green-700 break-all h-fit">{resAIBot.UserQuestion}</h1>
                        </div>

                        <div className="text-lg mt-4">
                            <h1 className="p-1 px-4 bg-white text-green-700 rounded-md font-semibold w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">{resAIBot.Model} Assistant.</h1>
                            <h1 className="text-white mt-2 text-lg font-medium">{resAIBot.ModelAnswer}</h1>
                        </div>
                        
                    </div>
                }
            </div> 
        </div>
    )
}
