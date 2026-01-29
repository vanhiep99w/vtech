export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  STAFF: 'STAFF'
} as const

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const

export const UserStatusToNumber: Record<UserStatus, number> = {
  ACTIVE: 1,
  INACTIVE: 0
}

export const NumberToUserStatus: Record<number, UserStatus> = {
  1: 'ACTIVE',
  0: 'INACTIVE'
}

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]
