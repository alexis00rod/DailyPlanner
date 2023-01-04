import { useTasks } from '../hook/useTasks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TaskCategoryPie = () => {
  const {workTasks, personalTasks, houseTasks, studyTasks, shoppingTasks, otherTasks} = useTasks()

  return <Pie
    width={250}
    data={{
      labels: ['Trabajo','Personal','Casa','Estudio','Compras','Otros'],
      datasets: [{
        label: 'Tareas',
        data: [workTasks.length, personalTasks.length, houseTasks.length, studyTasks.length, shoppingTasks.length, otherTasks.length],
        backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'],
        borderWidth: 0,
      }],
    }}
    options={{
      plugins: {
        legend: {
          position:"bottom",
          align: "start",
          labels: {
            boxWidth: 20,
            boxHeight: 20,
            usePointStyle: true,
            pointStyle: "circle"
          },
        }
      }
  }}/>
}
