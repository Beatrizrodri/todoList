interface TaskType {
  id: number
  description: string
  status: {
    deleted: boolean
    completed: boolean
    active: boolean
  }
}

export function getTaskStats(tasks: TaskType[]) {
  const completed = tasks.filter(
    task => task.status.completed && !task.status.deleted
  ).length

  const active = tasks.filter(
    task => task.status.active && !task.status.deleted
  ).length

  const deleted = tasks.filter(task => task.status.deleted).length

  return {
    completed,
    active,
    deleted
  }
}
