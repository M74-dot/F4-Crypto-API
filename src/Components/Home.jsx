import React, { useEffect, useState } from "react";


const Home = ()=>{
  const [inputVal,setInputVal] = useState("")
  const [cryptoData,setCryptoData] = useState([]);
  const [filterData,setFilterData] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
      const actualData = await res.json();
      // console.log(actualData)
      setCryptoData(actualData)
      setFilterData(actualData)
    }
    fetchData()
  },[])

  const handleInputChange =(e)=>{
    setInputVal(e.target.value)
    const searchTerm = e.target.value.toLowerCase()
    const filtered = cryptoData.filter((crypto)=>{
      return (
        crypto.name.toLowerCase().includes(searchTerm) || crypto.symbol.toLowerCase().includes(searchTerm)
      )
    })
    setFilterData(filtered)
  }
  const handleMktSort = ()=>{
    const sortedByMkt = [...cryptoData].sort((a,b)=>b.market_cap-a.market_cap)
    setFilterData(sortedByMkt)
  }
  const handlePerSort = ()=>{
    const sortedByPer = [...cryptoData].sort((a,b)=>b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h);
    setFilterData(sortedByPer)
  }
  return(
    <div className="w-full md:w-[1030px] m-auto mt-5 p-5">
        <div className="flex flex-wrap gap-5 justify-between">
          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            className="border bg-black border-white text-white p-2 md:p-3 font-bold w-full md:w-[600px]"
            placeholder="Search by Name or Symbol"
          />
          <button
            className="bg-black border border-white font-bold p-2 md:p-3 text-white w-full md:w-auto"
            onClick={handleMktSort}
          >
            Sort By Mkt Cap
          </button>
          <button
            className="bg-black border border-white font-bold p-2 md:p-3 text-white w-full md:w-auto"
            onClick={handlePerSort}
          >
            Sort By Percentage
          </button>
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-sm md:text-md font-bold mt-5 divide-y divide-gray-500">
            <thead className="bg-black">
              <tr>
                <td className="px-2 py-2 md:px-6 md:py-5 text-white">Name</td>
                <td className="px-2 py-2 md:px-6 md:py-5 text-white">Symbol</td>
                <td className="px-2 py-2 md:px-6 md:py-5 text-white">Current Price</td>
                <td className="px-2 py-2 md:px-6 md:py-5 text-white">Total Volume</td>
                <td className="px-2 py-2 md:px-6 md:py-5 text-white">% Change</td>
                <td className="px-2 py-2 md:px-6 md:py-5 text-white">Mkt Capital</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {
                filterData.map((data)=>(
                <tr key={data.id}>
                  <td className="px-2 py-2 md:px-6 md:py-5 text-white flex gap-2 md:gap-3">
                      <img className="w-[20px] md:w-[30px] h-[20px] md:h-[30px]" src={data.image} alt={data.name}/>
                      {data.name}
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-5 text-white">{data.symbol.toUpperCase()}</td>
                  <td className="px-2 py-2 md:px-6 md:py-5 text-white">${data.current_price}</td>
                  <td className="px-2 py-2 md:px-6 md:py-5 text-white">${data.total_volume}</td>
                  <td className="px-2 py-2 md:px-6 md:py-5 text-white">
                    {
                      data.market_cap_change_percentage_24h < 0 
                      ?
                      <span className="text-red-500">{data.market_cap_change_percentage_24h}%</span>
                      :
                      <span className="text-green-500">{data.market_cap_change_percentage_24h}%</span>
                    }
                  </td>
                  <td className="px-2 py-2 md:px-6 md:py-5 text-white">Mkt Cap: ${data.market_cap}</td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Home;