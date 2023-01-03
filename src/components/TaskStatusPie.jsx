import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTasks } from '../hook/useTasks';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TaskStatusPie = () => {
    const { allTasks } = useTasks()

    let pending = allTasks.filter(e => e.completed === false)
    let finish = allTasks.filter(e => e.completed === true)

    // const data = {
    //     labels: ['Finalizado', 'Pendiente'],
    //     datasets: [{
    //         label: 'Tareas',
    //         data: [pending.length,finish.length],
    //         backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'],
    //         borderWidth: 0,
    //     }],
    // }

    return (
        <Pie 
        width={250}
        data={{
            labels: ['Finalizado', 'Pendiente'],
            datasets: [{
                label: 'Tareas',
                data: [pending.length,finish.length],
                backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'],
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
    )
} 
