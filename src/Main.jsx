import { ChatBot } from "./components/ChatBot";
import { Convertor } from "./components/Convertor";
import { Problems } from "./components/Problems";


export const Main = ({ isConvertor }) => {
    return (
        <div className="flex flex-col bg-slate-100 xl:flex-row h-screen">
            <div className="fixed bottom-10 left-10">
                <button className="mt-4 bg-green-700 rounded-full p-1 px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-white font-semibold text-2xl hover:bg-green-800" onClick={() => {
                    if (isConvertor === true) return window.location.href = '/resolver'
                    return window.location.href = '/convertor'
                }}>
                    {
                        isConvertor === true ?
                            <h1>Problems</h1> :
                            <h1>Convertor</h1>
                    }
                </button>
            </div>
            {
                isConvertor ?
                    <Convertor /> :
                    <Problems />
            }
            <ChatBot/>
        </div>
    )
}