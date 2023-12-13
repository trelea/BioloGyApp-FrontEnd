import { useState, useEffect } from "react"
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";
import maleFemaleImg from "../assets/maleFemaleLogo.png";

export const Problems = () => {
    const [gen1, setGen1] = useState({
        char: "",
        dominant: "",
        recesiv: ""
    })
    const [gen2, setGen2] = useState({
        char: "",
        dominant: "",
        recesiv: ""
    })
    const [result, setResult] = useState(null)

    const [male, setMale] = useState("")
    const [female, setFemale] = useState("")

    

    const getFenotip = () => {
        if(result["children"]){
            let phenotypeCounts = {};
            for(let i=0; i<result["children"].length; i++){
                let phenotype = '';
                if(result["children"][i][0] === result["children"][i][0].toUpperCase()){
                    phenotype += gen1["dominant"] + ' ';
                } else {
                    phenotype += gen1["recesiv"] + ' ';
                }
                if(result["children"][i][2] === result["children"][i][2].toUpperCase()){
                    phenotype += gen2["dominant"];
                } else {
                    phenotype += gen2["recesiv"];
                }
                phenotypeCounts[phenotype] = (phenotypeCounts[phenotype] || 0) + 1;
            }
            
            return <>
                {Object.entries(phenotypeCounts).map(([phenotype, count]) => (
                    <div key={phenotype}>
                        <span>{phenotype} - {(count*100)/result["children"].length}%</span>
                    </div>
                ))}
            </>
        }
    }

    const getGenotype = () => {
        if(result["children"]){
            let genotypeCounts = {};
            for(let i=0; i<result["children"].length; i++){
                let genotype = result["children"][i];
                genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
            }
            
            return <>
                {Object.entries(genotypeCounts).map(([genotype, count]) => (
                    <div key={genotype}>
                        <span>{genotype} - {(count*100)/result["children"].length}%</span>
                    </div>
                ))}
            </>
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (female.length <= 2) {
            setGen1({
                ...gen1,
                char: male[0].toUpperCase()
            });
            setGen2({
                ...gen2,
                char: ""
            });


            fetch(`${process.env.REACT_APP_API_URL}/legea2`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    "male":{
                      "gena1":male[0],
                      "gena2":male[1]
                    },
                    "female":{
                      "gena1":female[0],
                      "gena2":female[1]
                    }
                  })
            })
            .then(res => res.json())
            .then(data => {
                setResult(data);
                console.log(data);
            })
        } else {

            setGen1({
                ...gen1,
                char: male[0].toUpperCase()
            });
            setGen2({
                ...gen2,
                char: male[2].toUpperCase()
            });

            fetch(`${process.env.REACT_APP_API_URL}/legea3`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    "male":{
                      "caracter1":{
                            "gena1": male[0],
                            "gena2": male[1]
                      },
                      "caracter2":{
                            "gena1": male[2],
                            "gena2": male[3]
                      }
                    },
                    "female":{
                        "caracter1":{
                              "gena1": female[0],
                              "gena2": female[1]
                        },
                        "caracter2":{
                              "gena1": female[2],
                              "gena2": female[3]
                        }
                      }
                  })
            })
            .then(res => res.json())
            .then(data => {
                setResult(data);
                console.log(data);
            })
        }
        
    }
    const [readMore, setReadMore] = useState(false);
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
                    <strong className="underline text-green-600">Bolile genetice</strong> reprezintă toate anomaliile care apar ca urmare a dereglării materialului ereditar. Pentru bolile genetice nu este esențial factorul moștenirii maladiei, ci faptul că boala este cauzată de dereglările aparatului ereditar. Bolile genetice includ și boli ereditare.
                    </p>
                </div>  
            </div>

            <div className="mt-10 flex flex-col items-center">
                <form className="flex flex-col gap-2">

                    <div className="flex gap-2">
                        <label className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">G1</label>
                        <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" type="text" placeholder="dominant"
                            onChange={e => setGen1({
                                ...gen1,
                                dominant: e.target.value
                            })}/>
                        <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" type="text" placeholder="recesiv"
                            onChange={e => setGen1({
                                ...gen1,
                                recesiv: e.target.value
                            })}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">G2</label>
                        <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" type="text" placeholder="dominant"
                            onChange={e => setGen2({
                                ...gen2,
                                dominant: e.target.value
                            })}
                        />
                        <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none" type="text" placeholder="recesiv"
                            onChange={e => setGen2({
                                ...gen2,
                                recesiv: e.target.value
                            })}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">
                            <img className="h-6 w-6 aspect-square" src={maleImg} alt="" />
                        </div>
                        <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none w-full" type="text" placeholder="Hz Ceva Baga." onChange={e => setMale(e.target.value)}/>
                    </div>

                    <div className="flex gap-2">
                        <div className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none">
                            <img className="h-6 w-6 aspect-square" src={femaleImg} alt="" />
                        </div>
                        <input className="bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 px-4 text-green-700 leading-tight focus:outline-none w-full" type="text" placeholder="Hz Ceva Baga." onChange={e => setFemale(e.target.value)}/>
                    </div>

                    <button className="bg-white text-green-600 text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-center transition ease-in-out delay-100 hover:bg-green-600 hover:text-white hover:border-green-600" onClick={e => HandleSubmit(e)}>Calculeaza</button>

                </form>
            </div>

            {
                result && 
                    <div className="mt-10 flex justify-center w-full gap-2">
                        <table>
                            <tbody className="flex flex-col gap-2">
                                <tr className="flex gap-2">
                                    <td>
                                        <div className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border border-slate-200 rounded-2xl p-2 text-green-700 leading-tight focus:outline-none flex justify-center items-center">
                                            <img className="h-10 aspect-square" src={maleFemaleImg} alt="" />
                                        </div>
                                    </td>
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ male[0] + male[2] }</strong></td>
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ male[1] + male[3] }</strong></td>
                                </tr>
                                <tr className="flex gap-2">
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ female[0] + female[2] }</strong></td>
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{result["children"]?result["children"][0]:null}</td>
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{result["children"]?result["children"][1]:null}</td>
                                </tr>
                                <tr className="flex gap-2">
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center"><strong>{ female[1] + female[3] }</strong></td>
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ result["children"]?result["children"][2]:null }</td>
                                    <td className="w-16 h-16 bg-white text-lg font-semibold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl text-green-700 leading-tight focus:outline-none flex justify-center items-center">{ result["children"]?result["children"][3]:null }</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex flex-row gap-2">
                            <div className="text-lg font-semibold rounded-xl bg-green-600 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-white">
                                <h1 className="p-1 px-4 bg-white text-green-700 rounded-md font-semibold w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">Fenotip</h1>
                                {getFenotip()}
                            </div>

                            <div className="text-lg font-semibold rounded-xl bg-green-600 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-white">
                                <h1 className="p-1 px-4 bg-white text-green-700 rounded-md font-semibold w-fit shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">Genotip</h1>
                                {getGenotype()}
                            </div>
                        </div>
                    </div>
            }
            

        </div>
    )
}