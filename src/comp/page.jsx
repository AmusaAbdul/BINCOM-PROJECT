import { useState, useEffect } from "react"

const page = () => {
  const [create, setCreate] = useState(false)

  const [incident, setIncident] = useState(() => {
    const stored = localStorage.getItem("incident")
    return stored ? JSON.parse(stored) : ""
  })
  useEffect(() => {
    localStorage.setItem("incident", JSON.stringify(incident))
  }, [incident])

  const [incidents, setIncidents] = useState(() => {
    const stored = localStorage.getItem("incidents")
    return stored ? JSON.parse(stored) : []
  })
  useEffect(() => {
  localStorage.setItem("incidents", JSON.stringify(incidents))
  }, [incidents])

  const [category, setCategory] = useState(() => {
    const stored = localStorage.getItem("category")
    return stored ? JSON.parse(stored) : ""
  } )
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category))
  }, [category])

  const [type, setType] = useState(() => {
    const stored = localStorage.getItem("type")
    return stored ? JSON.parse(stored) : "All"
  })
  useEffect(() => {
    localStorage.setItem("type", JSON.stringify(type))
  }, [type])

  const [search, setSearch] = useState(() => {
    const stored = localStorage.getItem("search")
    return stored ? JSON.parse(stored) : ""
  })
  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search))
  }, [search])
  
  const handleClick = (e) => {
    e.preventDefault()
    if (!incident?.trim() || !category) { alert("Input field is empty"); return; }
    const newIncident = {
      id: Date.now(),
      text: incident,
      category: category
    }
    setIncidents(prev => [...prev, newIncident])
    setCategory("")
    setIncident("")
  }

  const filteredType = type === "All" ? incidents : incidents.filter(i => i.category === type)

  const searchIncident = filteredType.filter(f => (
    f.category.toLowerCase().includes(search.toLowerCase())
  ))
  return (
    <div className="container p-5  space-y-5">
      <button onClick={() => setCreate(true)} className={`${create ? "hidden" : ""} bg-gold text-bg font-bold font-mono p-5 text-xl`}>Create an incident</button>

      {create ?
        <div className="mt-10 flex flex-col gap-5">
          <select className=" bg-gold p-3 outline-none text-black" onChange={(e) => setCategory(e.target.value)} name="category" >
            <option value="">Select a category type</option>
            <option value="Physical">Physical</option>
            <option value="Infrastructural">Infrastructural</option>
            <option value="Clinical">Clinical</option>
            <option value="Workplace">Workplace</option>
            <option value="Near-miss">Near-miss</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="incident" value={incident} onChange={(e) => setIncident(e.target.value)} className="border-2 h-30 border-gold p-3 outline-none text-bg" type="text" placeholder="INPUT INCIDENT HERE" />

          <button onClick={handleClick} className="bg-green-500 p-2 w-fit flex-end text-bg">Add</button>


          <div className="bg-white mt-15 p-5 space-y-3">
            <select className=" bg-gold p-3 outline-none w-full text-black" onChange={(e) => setType(e.target.value)} name="type" >
              <option value="All">All</option>
              <option value="Physical">Physical</option>
              <option value="Infrastructural">Infrastructural</option>
              <option value="Clinical">Clinical</option>
              <option value="Workplace">Workplace</option>
              <option value="Near-miss">Near-miss</option>
              <option value="Other">Other</option>
            </select>
            <input className=" bg-gold p-3 outline-none w-full text-black" name="search" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search incident by category"/>
            {searchIncident.length === 0 ?
              <h1 className="font-mono text-black text-xl mt-50">No type of incident yet,</h1> :
              searchIncident.map((t) => (
                <ul key={t.id} className="bg-white text-black p-3 mt-5 notebook block">
                  <li>{t.text}</li>
                </ul>
              ))}
          </div>
        </div> :
        <h1 className="font-mono text-xl mt-50">No incident yet, Create an incident</h1>
      }


    </div>
  )
}

export default page
