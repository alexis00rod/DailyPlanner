export const AddTasks = () => {
    return (
        <section className="flex flex-col gap-4">
            <header className="mb-2 px-4 py-4 bg-violet-500 rounded-b-lg text-white shadow-lg">
                <h2 className="px-2 py-3 uppercase text-xl font-bold">Add new tasks</h2>
            </header>
            <div className="mx-4 px-2 py-2 flex flex-col items-center bg-white rounded-lg shadow-lg">
                <form className="px-2 py-2 w-full flex flex-col gap-2">
                    <input type="text" name="title" placeholder="Title" className="px-3 py-3 border border-slate-400 rounded-lg shadow-md resize-none outline-none duration-300 hover:border-violet-500" />
                    <textarea name="description" placeholder="Description" className="px-3 py-3 border border-slate-400 rounded-lg shadow-md resize-none outline-none duration-300 hover:border-violet-500" ></textarea>
                    <input type="date" name="date" className="px-3 py-3 border border-slate-400 rounded-lg shadow-md resize-none outline-none duration-300 hover:border-violet-500" />
                    <select name="priority" className="px-3 py-3 border border-slate-400 rounded-lg shadow-md resize-none outline-none duration-300 hover:border-violet-500" defaultValue={0}>
                        <option value="0" disabled>Priority</option>
                        <option value="1">Low</option>
                        <option value="2">Normal</option>
                        <option value="3">High</option>
                    </select>
                    <button className="w-max h-12 mx-auto my-2 px-4 bg-violet-400 text-lg text-white font-semibold rounded-lg duration-300 hover:bg-violet-500">Add task</button>
                </form>
            </div>
        </section>
    )
}
