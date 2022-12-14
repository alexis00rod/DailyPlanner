import { useTasks } from '../hook/useTasks'
import { TaskItem } from '../components/index'

const convertDateToString = (value) => {
  let year = value.getUTCFullYear()
  let month = ("0"+(value.getUTCMonth()+1)).slice(-2)
  let day = ("0" + value.getUTCDate()).slice(-2)

  return `${year}-${month}-${day}`
}

export const TaskList = ({category,filter}) => {
  const { allTasks, workTasks, personalTasks, houseTasks, studyTasks, shoppingTasks, otherTasks } = useTasks()

  const tasksList = (tasks,filter) => {
    const list = filter === "today" 
                  ? tasks.filter(e => e.day === convertDateToString(new Date))
                  : filter === "pending"
                    ? tasks.filter(e => e.completed === false)
                    : filter === "finish"
                      ? tasks.filter(e => e.completed === true)
                      : tasks

    return list.map(item => <TaskItem key={item.id} item={item} />)
  }

  return <ul className='px-1 py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {category === "all" && tasksList(allTasks,filter)}
    {category === "work" && tasksList(workTasks,filter)}
    {category === "personal" && tasksList(personalTasks,filter)}
    {category === "house" && tasksList(houseTasks,filter)}
    {category === "study" && tasksList(studyTasks,filter)}
    {category === "shopping" && tasksList(shoppingTasks,filter)}
    {category === "other" && tasksList(otherTasks,filter)}
  </ul>
}
