import './style.css'
import { VscChromeClose } from 'react-icons/vsc'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  taskDescription: string
  onTaskDescriptionChange: (value: string) => void
}

export function Modal({
  isOpen,
  onClose,
  onSave,
  taskDescription,
  onTaskDescriptionChange
}: ModalProps) {
  if (!isOpen) return null

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-container" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <VscChromeClose />
        </button>

        <h2 className="modal-title">Nova Tarefa</h2>

        <input
          type="text"
          className="modal-input"
          placeholder="Digite a descrição da tarefa..."
          value={taskDescription}
          onChange={e => onTaskDescriptionChange(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />

        <div className="modal-buttons">
          <button className="cancel-task-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="save-task-button" onClick={onSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
