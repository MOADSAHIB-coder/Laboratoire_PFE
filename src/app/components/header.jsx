
function Header(){

    const chercher = (e) => {
        e.preventDefault()
    }


    return (
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h1 className="flex items-center gap-2 text-4xl font-extrabold text-white bg-blue-600 px-6 py-3 rounded-full shadow-lg uppercase tracking-wider">
                        <img src="/images/maroc.png" alt="Logo" className="w-10 h-10" />
                        LabTechNet
                    </h1>


                    <form className="flex-1 flex items-center justify-center gap-4">
                            <div className="flex gap-2">
                            <input
                            type="search"
                            placeholder="Recherche"
                            className="ml-[18rem] border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                            type="submit"
                            value="chercher"
                            onClick={chercher}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"/>
                        </div>
                            <select className="ml-[30rem] border rounded px-3 py-2 bg-white cursor-pointer">
                            <option>Francais</option>
                            <option>Arabe</option>
                            <option>Anglais</option>
                            </select>
                    </form>
                </header>
    )
}

export default Header