import { Header, Main, TaskCategoryPie, TaskStatusPie } from "../components/index"

export const Analytics = () => {
  return <>
    <Header title="Analitica" />
    <Main>
      <div className="section flex-wrap">
        <div className="w-full max-w-md mx-auto flex flex-col">
          <h2 className="mb-2 px-2 py-1 text-xl font-medium">Todas las tareas</h2>
          <TaskCategoryPie />
        </div>
        <div className="w-full max-w-md mx-auto flex flex-col">
          <h2 className="mb-2 px-2 py-1 text-xl font-medium">Estado de las tareas</h2>
          <TaskStatusPie />
        </div>
      </div>
    </Main>
  </>
}
