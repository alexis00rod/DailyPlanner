export const Profile = () => {
    return (
        <section className="flex flex-col gap-4">
            <header className="mb-2 px-4 py-4 bg-violet-500 rounded-b-lg text-white">
                <h2 className="px-2 py-3 uppercase text-xl font-bold">Profile</h2>
            </header>
            <div className="mx-4 px-2 py-2 flex flex-col bg-white rounded-lg">
                {/* Mostar informacion del usuario y estadisticas de cuantas tareas se cumplen */}
                <p>Name</p>
            </div>
        </section>
    )
}
