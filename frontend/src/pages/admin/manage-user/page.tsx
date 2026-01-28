import { DataTable } from './data-table'
import { columns, type User } from './columns'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getAllUsersApi } from '@/services/user/user.api'
import { toast } from 'sonner'
import { UserTableSkeleton } from '@/components/common/LoadingTable'

export default function UserPage() {
  const { t } = useTranslation('user')

  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await getAllUsersApi()
        setData(res)
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('Load data failed')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibolds'>{t('list')}</h1>
      </div>
      {loading ? <UserTableSkeleton /> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
