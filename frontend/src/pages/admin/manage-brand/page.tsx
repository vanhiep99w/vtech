import { UserTableSkeleton } from '@/components/common/LoadingTable'
import { columns } from '@/pages/admin/manage-brand/columns'
import { DataTable } from '@/pages/admin/manage-brand/data-table'
import { getAllBrandApi } from '@/services/brand/brand.api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export default function BrandPage() {
  const { t } = useTranslation('brand')

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrandApi
  })

  useEffect(() => {
    if (isError) toast.error('Load data failed')
  }, [isError])

  return (
    <div>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibolds'>{t('titles.list')}</h1>
      </div>
      {isLoading ? <UserTableSkeleton /> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
