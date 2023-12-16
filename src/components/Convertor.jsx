import { useRef, useState } from "react"

export const Convertor = () => {
    const [inputData, setInputData] = useState({ catena: '' });
    const [res, setRes] = useState(null);
    const [readMore, setReadMore] = useState(false);

    const ref = useRef(null);

    const handleRepl = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/solve/repl`, { 
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputData) 
        }).then(res => res.json()).then(d => {setRes(d.replicarea_antiCodogena) ; setInputData({...inputData, catena: ''}); return ref.current.value = ''});
    }

    const handleTrans = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/solve/trans`, { 
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputData) 
        }).then(res => res.json()).then(d => {setRes(d.transcriptia_ARNm) ; setInputData({...inputData, catena: ''}); return ref.current.value = ''});
    }

    const handleDecode = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/solve/decode`, { 
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputData) 
        }).then(res => res.json()).then(d => {
            setInputData({...inputData, catena: ''});
            ref.current.value = '';
            if (d.decodificarea === "Someting went wrong into your input string.") return setRes(null);
            return setRes(d.decodificarea);
        });
    }

    const handleAll = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/solve`, { 
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputData) 
        }).then(res => res.json()).then(d => {
            setInputData({...inputData, catena: ''});
            ref.current.value = '';
            if (d.decodificarea === "Someting went wrong into your input string.") return setRes(null);
            return setRes(d);
        });
    }

    return (
        <div className="xl:w-[50%]">

            <div className="mt-8 mx-6 sm:mx-10">
                <div className="flex items-center">
                    <img className="rounded-full border p-2 border-gray-700" width="50" height="50" src="https://img.icons8.com/pastel-glyph/64/dna-helix.png" alt="dna-helix"/>
                    <h1 className="ml-4 text-black text-3xl font-extrabold border-b-2 pb-2 border-black sm:text-4xl">ADN Calculator</h1> 
                </div>
                

                <button className="hover:bg-green-600 hover:text-white mt-4 bg-white rounded-full p-1 px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:hidden text-green-600 font-semibold text-sm"
                onClick={e => setReadMore(!readMore)}>
                    <h1>More ...</h1>
                </button>
                
                <div className={ readMore ? "flex flex-col gap-6 mt-8" : 
                                  "hidden lg:flex flex-col gap-6 mt-8"
                                }>
                    <p className="border-l-2 border-black pl-2  text-gray-900 font-medium text-base">
                    <strong className="underline text-green-600">Replicarea ADN</strong> este un proces fundamental care are loc în celulele organismelor vii și este baza eredității biologice. În urma acestui proces se realizează copierea, mai precis duplicarea, moleculelor de ADN, care sunt purtătorii informației genetice.
                    </p>

                    <p className="border-l-2 border-black pl-2  text-gray-900 font-medium text-base">
                    <strong className="underline text-green-600">Transcrierea</strong> este prima dintre mai multe etape ale expresiei genei bazate pe ADN, în care un anumit segment de ADN este copiat în ARN de către enzima ARN polimerază .
                    </p>

                    <p className="border-l-2 border-black pl-2  text-gray-900 font-medium text-base">
                    În biologia moleculară și în genetică, <strong className="underline text-green-600">Translația</strong> este procesul ce are loc în interiorul ribozomilor localizați citoplasmatic sau la nivelul reticulului endoplasmatic, organite care au rolul de a sintetiza proteinele.
                    </p> 
                </div>  
            </div>

            <div className="mt-10 mx-6 sm:mx-36 lg:mx-52 xl:mx-24 2xl:mx-60">
                <form className="flex flex-col gap-4">
                    <label className="text-3xl font-bold text-center text-green-600 underline.">Introdu Catena</label>

                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Catena Adn: ACGCTG..." onChange={e => setInputData({...inputData, catena: e.target.value})}
                    ref={ref} value={inputData['catena']}/>

                    <button className="bg-white text-green-600 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center transition ease-in-out delay-300 hover:bg-green-600 hover:text-white hover:border-green-600"
                    onClick={e => handleRepl(e)}>Replicare</button>

                    <button className="bg-white text-green-600 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center transition ease-in-out delay-300 hover:bg-green-600 hover:text-white hover:border-green-600"
                    onClick={e => handleTrans(e)}>Transcriere</button>

                    <button className="bg-white text-green-600 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center transition ease-in-out delay-300 hover:bg-green-600 hover:text-white hover:border-green-600"
                    onClick={e => handleDecode(e)}>Translatie</button>

                    <button className="bg-white text-green-600 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center transition ease-in-out delay-300 hover:bg-green-600 hover:text-white hover:border-green-600"
                    onClick={e => handleAll(e)}>Complet</button>

                </form>
            </div>  

            <div className="mx-6 mt-10 mb-10 sm:mx-36 lg:mx-52 break-words xl:mb-10 xl:mx-24 2xl:mx-60">
                { res &&
                    <div className="text-lg font-semibold rounded-2xl p-4 leading-tight bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200">
                        <div className="flex">
                            <h1 className="text-green-600">DNA</h1>
                            <h1>@</h1>
                            <h1 className="text-blue-800">Convertor</h1>
                            <h1 className="ml-1">~/App $:</h1>
                        </div>
                        <div className="text-base font-semibold mt-4 text-green-600">
                            { Object.keys(res).length === 4 ?
                                 <div className="flex flex-col gap-3">
                                    <p>Original: {res.original}</p>
                                    <p>Replicarea: {res.replicarea_antiCodogena}</p>
                                    <p>Transcrierea: {res.transcriptia_ARNm}</p>
                                    <p>Translatia: {res.decodificarea}</p>
                                </div> 
                                :
                                <div className="flex flex-col gap-3">
                                    <p>Rezultat: {res}</p> 
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
