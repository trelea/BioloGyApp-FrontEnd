import { useState } from "react"
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";
import maleFemaleImg from "../assets/maleFemaleLogo.png";

export const Problems = () => {
    const [readMore, setReadMore] = useState(false);

    const [basicProblem, setBasicProblem] = useState(true);
    const [advancedProblem, setAdvancedProblem] = useState(false);

    
    //BASIC
    const [previewBasicTable, setPreviewBasicTable] = useState(false);
    const [inputBasicProblem, setInputBasicProblem] = useState({ male: "", female: "", dominant: "", recesiv: "" });
    const [inputBasicProblemRes, setInputBasicProblemRes] = useState();
    const sendReqToLawBasic = (e) => {
        e.preventDefault();
        if (inputBasicProblem.dominant.length < 1 && inputBasicProblem.recesiv.length < 1) return alert("Date Gresite Introduse"); 
        if (inputBasicProblem.male.length !== 2 && inputBasicProblem.female.length !== 2 ) return alert("Date Gresite Introduse"); 
        fetch(`${process.env.REACT_APP_API_URL}/legea2`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputBasicProblem)
        })
        .then(res => res.json())
        .then(data => {
            setInputBasicProblemRes(data)
            return setPreviewBasicTable(true)
        })
    }
        

    //ADVANCED
    const [previewAdvTable, setPreviewAdvTable] = useState(false);
    const [inputAdvProblem, setInputAdvProblem] = useState({ male: "", female: "", dominantMale: "", recesivMale: "", dominantFemale: "", recesivFemale: "" });
    const [inputAdvProblemRes, setInputAdvProblemRes] = useState();
    const sendReqToLawAdv = (e) => {
        e.preventDefault();
        if (inputAdvProblem.dominantMale.length < 1 && inputAdvProblem.recesivMale.length < 1) return alert("Date Gresite Introduse");
        if (inputAdvProblem.dominantFemale.length < 1 && inputAdvProblem.recesivFemale.length < 1) return alert("Date Gresite Introduse");
        if (inputAdvProblem.male.length !== 4 && inputAdvProblem.female.length !== 4 ) return alert("Date Gresite Introduse");
        fetch(`${process.env.REACT_APP_API_URL}/legea3`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputAdvProblem)
        })
        .then(res => res.json())
        .then(data => {
            setInputAdvProblemRes(data)
            return setPreviewAdvTable(true)
        })
    }

    return (
        <div className="xl:w-[50%]">
            <div className="mt-8 mx-6 sm:mx-10">
                <div className="flex items-center">
                    <img className="rounded-full border p-2 border-gray-700" width="50" height="50" src="https://img.icons8.com/pastel-glyph/64/dna-helix.png" alt="dna-helix"/>
                    <h1 className="ml-4 text-black text-3xl font-extrabold border-b-2 pb-2 border-black sm:text-4xl">Probleme Genetice</h1> 
                </div>
                

                <button className="hover:bg-green-600 hover:text-white mt-4 bg-white rounded-full p-1 px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:hidden text-green-600 font-semibold text-sm"
                onClick={e => setReadMore(!readMore)}>
                    <h1>More ...</h1>
                </button>
                
                <div className={ readMore ? "flex flex-col gap-6 mt-8" : 
                                  "hidden lg:flex flex-col gap-6 mt-8"
                                }>
                    <p className="border-l-2 border-black pl-2  text-gray-900 font-medium text-base">
                    <strong className="underline text-green-600">Mendel</strong>, prin experienţe de hibridizare pe mazăre (Pisum sativum), a descoperit aceste legi, cunoscute ca legile mendeliene ale eredităţii. Hibridizarea este încrucişarea între două organisme care se deosebesc printr-un anumit număr de caractere ereditare. Astfel, Mendel a încrucişat intre ele diverse soiuri de mazăre, cu bob galben sau verde, cu bob zbârcit sau neted, cu tulpină înaltă sau scurtă.
                    </p>
                </div>  
            </div>
            
            <div className="mt-10 mx-6 sm:mx-36 lg:mx-52 xl:mx-24 2xl:mx-60 flex justify-between">
                <button className={ basicProblem === false ?
                    "bg-white rounded-full px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-green-700 font-medium text-sm" :
                    "bg-green-700 rounded-full px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-white font-medium text-sm"
                } onClick={() => {
                    setBasicProblem(true);
                    setAdvancedProblem(false);
                    setPreviewBasicTable(false);
                    setPreviewAdvTable(false);
                }}>Basic Problem</button>
                <button className={ basicProblem === true ?
                    "bg-white rounded-full px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-green-700 font-medium text-sm" :
                    "bg-green-700 rounded-full px-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-white font-medium text-sm"
                } onClick={() => {
                    setBasicProblem(false);
                    setAdvancedProblem(true);
                    setPreviewBasicTable(false);
                    setPreviewAdvTable(false);
                }}>Advanced Legea III</button>
            </div>

            <div className="mt-10 mx-6 sm:mx-36 lg:mx-52 xl:mx-24 2xl:mx-60">
                {
                    basicProblem && 
                        <form className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">
                                    <img className="h-6 w-6 aspect-square" src={maleImg} alt="" />
                                </div>
                                <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none w-full" type="text" placeholder="Gena masculina" onChange={e => setInputBasicProblem({ ...inputBasicProblem, male: e.target.value })}/>
                            </div>

                            <div className="flex gap-2">
                                <div className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">
                                    <img className="h-6 w-6 aspect-square" src={femaleImg} alt="" />
                                </div>
                                <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none w-full" type="text" placeholder="Gena femenina" onChange={e => setInputBasicProblem({ ...inputBasicProblem, female: e.target.value })}/>
                            </div>

                            <div className="flex gap-2">
                                <label className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none flex justify-center items-center">
                                    <h1>C1</h1>
                                </label>
                                <div className="flex flex-col gap-2 w-full">
                                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Dominant" onChange={e => setInputBasicProblem({
                                        ...inputBasicProblem,
                                        dominant: e.target.value
                                    })}/>
                                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Recesiv" onChange={e => setInputBasicProblem({
                                        ...inputBasicProblem,
                                        recesiv: e.target.value
                                    })}/>
                                </div>
                                
                            </div>                  
                            <button className="bg-white text-green-700 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center hover:bg-green-700 hover:text-white hover:border-green-700" onClick={e => sendReqToLawBasic(e)}>Incruciseaza</button>
                        </form>
                }
                {
                    advancedProblem &&
                        <form className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">
                                    <img className="h-6 w-6 aspect-square" src={maleImg} alt="" />
                                </div>
                                <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none w-full" type="text" placeholder="Gena masculina" onChange={e => setInputAdvProblem({
                                    ...inputAdvProblem,
                                    male: e.target.value
                                })}/>
                            </div>

                            <div className="flex gap-2">
                                <div className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">
                                    <img className="h-6 w-6 aspect-square" src={femaleImg} alt="" />
                                </div>
                                <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none w-full" type="text" placeholder="Gena femenina" onChange={e => setInputAdvProblem({
                                    ...inputAdvProblem,
                                    female: e.target.value
                                })}/>
                            </div>

                            <div className="flex gap-2">
                                <label className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none flex justify-center items-center">
                                    <h1>C1</h1>
                                </label>
                                <div className="flex flex-col gap-2 w-full">
                                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Dominant" onChange={e => setInputAdvProblem({
                                        ...inputAdvProblem,
                                        dominantMale: e.target.value
                                    })}/>
                                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Recesiv" onChange={e => setInputAdvProblem({
                                        ...inputAdvProblem,
                                        recesivMale: e.target.value
                                    })}/>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <label className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none flex justify-center items-center">
                                    <h1>C2</h1>
                                </label>
                                <div className="flex flex-col gap-2 w-full">
                                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Dominant" onChange={e => setInputAdvProblem({
                                        ...inputAdvProblem,
                                        dominantFemale: e.target.value
                                    })}/>
                                    <input type="text" className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" placeholder="Recesiv" onChange={e => setInputAdvProblem({
                                        ...inputAdvProblem,
                                        recesivFemale: e.target.value
                                    })}/>
                                </div>
                            </div>                
                            <button className="bg-white text-green-700 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center hover:bg-green-700 hover:text-white hover:border-green-700" onClick={e => sendReqToLawAdv(e)}>Incruciseaza</button>
                        </form>
                }
                
            </div> 
            
            <div className="mt-10 mx-6 sm:mx-36 lg:mx-52 xl:mx-24 2xl:mx-60 mb-10">
                {
                    previewBasicTable &&
                        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center sm:items-start">
                            <table>
                                <tbody className="flex flex-col gap-1">
                                    <tr className="flex gap-1">
                                        <td>
                                            <div className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none flex justify-center items-center">
                                                <img className="h-10 aspect-square" src={maleFemaleImg} alt="" />
                                            </div>
                                        </td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputBasicProblem.male[0] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputBasicProblem.male[1] }</strong></td>
                                    </tr>
                                    <tr className="flex gap-1">
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputBasicProblem.female[0] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputBasicProblemRes.table[0] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputBasicProblemRes.table[1] }</td>
                                    </tr>
                                    <tr className="flex gap-1">
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputBasicProblem.female[1] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputBasicProblemRes.table[2] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputBasicProblemRes.table[3] }</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="flex flex-row gap-2">
                                
                                <div>
                                    <h1 className="p-1 px-4 bg-white text-green-700 rounded-md font-semibold w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">Genotip:</h1>
                                    {
                                        Object.keys(inputBasicProblemRes.genotip).map((attribute) => {
                                            return <h1 className="text-green-700 font-semibold text-lg">
                                                {attribute}: {inputBasicProblemRes.genotip[attribute]}%
                                            </h1>
                                        })
                                    }
                                </div>
                                    
                                

                                <div>
                                    <h1 className="p-1 px-4 bg-white text-green-700 rounded-md font-semibold w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">Fenotip:</h1>
                                    {
                                        Object.keys(inputBasicProblemRes.fenotip).map((attribute) => {
                                            return <h1 className="text-green-700 font-semibold text-lg">
                                                {attribute}: {inputBasicProblemRes.fenotip[attribute]}%
                                            </h1>
                                        })
                                    }
                                </div>
                                    
                                
                            </div>
                        </div>   
                }
                {
                    previewAdvTable &&
                        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center sm:items-start">
                            <table>
                                <tbody className="flex flex-col gap-1">
                                    <tr className="flex gap-1">
                                        <td>
                                            <div className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none flex justify-center items-center">
                                                <img className="h-10 aspect-square" src={maleFemaleImg} alt="" />
                                            </div>
                                        </td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.maleRow[0] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.maleRow[1] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.maleRow[2] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.maleRow[3] }</strong></td>
                                    </tr>
                                    <tr className="flex gap-1">
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.femaleRow[0] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[0] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[1] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[2] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[3] }</td>
                                        
                                    </tr>
                                    <tr className="flex gap-1">
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.femaleRow[1] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[4] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[5] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[6] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[7] }</td>
                                        
                                    </tr>
                                    <tr className="flex gap-1">
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.femaleRow[2] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[8] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[9] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[10] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[11] }</td>
                                        
                                    </tr>
                                    <tr className="flex gap-1">
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ inputAdvProblemRes.femaleRow[3] }</strong></td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[12] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[13] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[14] }</td>
                                        <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ inputAdvProblemRes.table[15] }</td>
                                        
                                    </tr>
                                </tbody>
                            </table>


                           
                        </div>
                }
            </div>
            
            
            

        </div>
    )
}