export const taskMutationKeys = {
  add: () => ['add-task'] as const,
  update: (taskId: string) => ['update-task', taskId] as const,
  delete: (taskId: string) => ['delete-task', taskId] as const,
}
