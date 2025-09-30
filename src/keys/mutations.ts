export const taskMutationKeys = {
  add: () => ['add-task'] as const,
  update: (taskId: string) => ['update-task', taskId] as const,
  delete: (taskId: string) => ['delete-task', taskId] as const,
  clearAll: () => ['clear-tasks'] as const,
}

export const waterSubgoalMutationKeys = {
  undo: (subgoalId: string) => ['undo-water-subgoal', subgoalId] as const,
  complete: (subgoalId: string) =>
    ['complete-water-subgoal', subgoalId] as const,
  updateStatus: (subgoalId: string) =>
    ['update-water-subgoal-status', subgoalId] as const,
}
