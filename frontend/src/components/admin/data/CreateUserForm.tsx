'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export function CreateUserForm() {
  return (
    <form className='space-y-4'>
      <div className='space-y-2'>
        <Label>Username</Label>
        <Input placeholder='username' />
      </div>

      <div className='space-y-2'>
        <Label>Email</Label>
        <Input type='email' placeholder='email@example.com' />
      </div>

      <div className='space-y-2'>
        <Label>Full name</Label>
        <Input placeholder='Full name' />
      </div>

      <div className='space-y-2'>
        <Label>Phone</Label>
        <Input placeholder='0123456789' />
      </div>

      <div className='space-y-2'>
        <Label>Role</Label>
        <Select defaultValue='USER'>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ADMIN'>Admin</SelectItem>
            <SelectItem value='USER'>User</SelectItem>
            <SelectItem value='STAFF'>Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label>Status</Label>
        <Select defaultValue='ACTIVE'>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ACTIVE'>Active</SelectItem>
            <SelectItem value='INACTIVE'>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-end gap-2 pt-4'>
        <Button type='submit'>Create</Button>
      </div>
    </form>
  )
}
