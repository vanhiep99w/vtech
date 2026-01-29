import { UserTableSkeleton } from '@/components/common/LoadingTable'
import { getAllUsersApi } from '@/services/user/user.api'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { columns } from './columns'
import { DataTable } from './data-table'
import { toast } from 'sonner'
import { useEffect } from 'react'

export default function UserPage() {
  const { t } = useTranslation('user')

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsersApi
  })

  useEffect(() => {
    if (isError) toast.error('Load data failed')
  }, [isError])

  return (
    <div>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibolds'>{t('list')}</h1>
      </div>
      {isLoading ? <UserTableSkeleton /> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
