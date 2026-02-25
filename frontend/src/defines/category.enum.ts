export const CategoryStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const

export type CategoryStatus = (typeof CategoryStatus)[keyof typeof CategoryStatus]

export const CategoryStatusMap: Record<number, CategoryStatus> = {
  1: CategoryStatus.ACTIVE,
  0: CategoryStatus.INACTIVE
}
