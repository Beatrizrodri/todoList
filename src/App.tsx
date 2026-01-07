import './style.css'

import { Task } from './components/Task/Index'
import { useState } from 'react'

interface TaskType {
  id: number
  description: string
  status: {
    deleted: boolean
    completed: boolean
    active: boolean
  }
}

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      description: 'alimentar Luna',
      status: {
        deleted: false,
        completed: false,
        active: true
      }
    },
    {
      id: 2,
      description: 'alimentar LuKe',
      status: {
        deleted: false,
        completed: false,
        active: true
      }
    },
    {
      id: 3,
      description: 'Jogar',
      status: {
        deleted: false,
        completed: false,
        active: true
      }
    }
  ])

  const handleToggleComplete = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: {
                ...task.status,
                completed: !task.status.completed,
                active: task.status.completed
              }
            }
          : task
      )
    )
  }

  const handleDelete = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: {
                ...task.status,
                deleted: true,
                active: false
              }
            }
          : task
      )
    )
  }

  const activeTasks = tasks.filter(task => !task.status.deleted)

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="header">
            <h1>Todo List</h1>
          </div>

          {activeTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))}
          <button className="add-task-button">Adicionar Tarefa</button>
        </div>
      </div>
    </>
  )
}
