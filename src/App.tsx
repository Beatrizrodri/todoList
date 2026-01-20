import './style.css'

import { useState } from 'react'
import { Task } from './components/Task/Index'
import { Modal } from './components/Modal/Index'
import { FilterMenu } from './components/FilterMenu/Index'
import type { FilterType } from './components/FilterMenu/Index'
import { TaskChart } from './components/TaskChart/Index'
import { getTaskStats } from '../src/utils/taskStats'

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

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')

  const stats = getTaskStats(tasks)

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

  const handleAddTask = () => {
    if (newTaskDescription.trim() === '') {
      return
    }

    const newId = Math.max(...tasks.map(t => t.id), 0) + 1

    const newTask: TaskType = {
      id: newId,
      description: newTaskDescription.trim(),
      status: {
        deleted: false,
        completed: false,
        active: true
      }
    }

    setTasks(prevTasks => [...prevTasks, newTask])
    setNewTaskDescription('')
    setIsAddingTask(false)
  }

  const handleCloseModal = () => {
    setNewTaskDescription('')
    setIsAddingTask(false)
  }

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case 'active':
        return tasks.filter(task => task.status.active && !task.status.deleted)
      case 'completed':
        return tasks.filter(
          task => task.status.completed && !task.status.deleted
        )
      case 'deleted':
        return tasks.filter(task => task.status.deleted)
      case 'all':
      default:
        return tasks.filter(task => !task.status.deleted)
    }
  }

  const filteredTasks = getFilteredTasks()

  return (
    <>
      <FilterMenu
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <div className="container">
        <div className="content">
          <div className="header">
            <h1>Todo List</h1>
          </div>

          <div className="main-content">
            <div className="tasks-container">
              <div className="tasks">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <Task
                      key={task.id}
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="no-tasks-message">
                    Nenhuma tarefa encontrada para este filtro.
                  </div>
                )}
              </div>

              <button
                className="add-task-button"
                onClick={() => setIsAddingTask(true)}
              >
                Adicionar Tarefa
              </button>
            </div>

            <div className="chart-wrapper">
              <TaskChart
                completed={stats.completed}
                active={stats.active}
                deleted={stats.deleted}
              />
            </div>
          </div>

          <Modal
            isOpen={isAddingTask}
            onClose={handleCloseModal}
            onSave={handleAddTask}
            taskDescription={newTaskDescription}
            onTaskDescriptionChange={setNewTaskDescription}
          />
        </div>
      </div>
    </>
  )
}
