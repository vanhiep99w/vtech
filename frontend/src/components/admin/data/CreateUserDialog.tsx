import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CreateUserForm } from '@/components/admin/data/CreateUserForm'

export function CreateUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='default' className='hidden h-8 lg:flex'>
          <Plus />
          Create new
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
        </DialogHeader>

        <CreateUserForm />
      </DialogContent>
    </Dialog>
  )
}
