
function Header(){


    return (
        <header className="sticky top-0 z-50 bg-white flex flex-col md:flex-row md:items-center md:justify-between px-5 py-4">
                    <h1 className="flex items-center gap-2 text-3xl font-extrabold text-black px-6 py-3  uppercase tracking-wider">
                        <img src="/images/maroc.png" alt="Logo" className="w-10 h-10" />
                        ESTD-LabTechNet
                    </h1>
                    
                    <form className="flex-1 flex items-center justify-center gap-4">
                            
                            <select className="ml-[63rem] border rounded px-3 py-2 bg-white cursor-pointer">
                            <option>Francais</option>
                            <option>Arabe</option>
                            <option>Anglais</option>
                            </select>
                    </form>
        </header>
    )
}

export default Header