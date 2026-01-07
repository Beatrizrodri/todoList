import './style.css'
import { VscCheck, VscChromeClose } from 'react-icons/vsc'

interface TaskProps {
  task: {
    id: number
    description: string
    status: {
      deleted: boolean
      completed: boolean
      active: boolean
    }
  }
  onToggleComplete: (taskId: number) => void
  onDelete: (taskId: number) => void
}

export function Task({ task, onToggleComplete, onDelete }: TaskProps) {
  const handleComplete = () => {
    onToggleComplete(task.id)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <div
      className={
        task.status.completed ? 'task-container-completed' : 'task-container'
      }
    >
      <div className="task-content">
        <span className="task-description">{task.description}</span>
        <div className="task-buttons">
          <button className="delete-button" onClick={handleDelete}>
            <VscChromeClose />
          </button>
          <button className="completed-button" onClick={handleComplete}>
            <VscCheck />
          </button>
        </div>
      </div>
    </div>
  )
}
