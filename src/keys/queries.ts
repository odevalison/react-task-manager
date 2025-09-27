export const taskQueryKeys = {
  getAll: () => ['tasks'] as const,
  getOne: (taskId: string) => ['task', taskId] as const,
}
