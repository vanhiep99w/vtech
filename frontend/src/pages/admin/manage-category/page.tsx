import { UserTableSkeleton } from '@/components/common/LoadingTable'
import { columns } from '@/pages/admin/manage-category/columns'
import { DataTable } from '@/pages/admin/manage-category/data-table'
import { getAllCategoryApi } from '@/services/category/category.api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export default function CategoryPage() {
  const { t } = useTranslation('category')

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoryApi
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
