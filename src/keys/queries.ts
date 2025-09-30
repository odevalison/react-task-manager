export const taskQueryKeys = {
  getAll: () => ['tasks'] as const,
  getOne: (taskId: string) => ['task', taskId] as const,
}

export const waterConsumptionQueryKeys = {
  getAll: () => ['water-consumption'] as const,
}

export const waterSubgoalQueryKeys = {
  getAll: () => ['water-subgoals'] as const,
  getOne: () => (subgoalId: string) => ['waters-subgoal', subgoalId],
}
