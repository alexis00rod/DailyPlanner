export const Settings = () => {
    return (
        <section className="flex flex-col gap-4">
            <header className="mb-2 px-4 py-4 bg-violet-500 rounded-b-lg text-white shadow-lg">
                <h2 className="px-2 py-3 uppercase text-xl font-bold">Settings</h2>
            </header>
            <div className="mx-4 px-2 py-2 flex flex-col items-center bg-white rounded-lg shadow-lg">
                <p>Settings</p>
                {/* Agregar boton para cambiar de dark mode y boton para elegir color principal */}
            </div>
        </section>
    )
}
