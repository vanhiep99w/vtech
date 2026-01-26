import { DataTable } from './data-table'
import { columns, type User } from './columns'

export default function UserPage() {
  // Dữ liệu mẫu
  const data: User[] = [
    {
      id: '1',
      username: 'alexandra',
      email: 'alexandra.jones@example.com',
      fullName: 'Alexandra Jones',
      phone: '0123456781',
      avt: 'https://i.pravatar.cc/150?img=1',
      role: 'ADMIN',
      status: 'ACTIVE'
    },
    {
      id: '2',
      username: 'michael_tech',
      email: 'michael.tech@example.com',
      fullName: 'Michael Johnson',
      phone: '0912345672',
      avt: 'https://i.pravatar.cc/150?img=2',
      role: 'STAFF',
      status: 'ACTIVE'
    },
    {
      id: '3',
      username: 'sophie_lee',
      email: 'sophie.lee@example.com',
      fullName: 'Sophie Lee',
      phone: '0987654323',
      avt: 'https://i.pravatar.cc/150?img=3',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '4',
      username: 'david_wang',
      email: 'david.wang@example.com',
      fullName: 'David Wang',
      phone: '0909123454',
      avt: 'https://i.pravatar.cc/150?img=4',
      role: 'USER',
      status: 'INACTIVE'
    },
    {
      id: '5',
      username: 'emma_carter',
      email: 'emma.carter@example.com',
      fullName: 'Emma Carter',
      phone: '0934567895',
      avt: 'https://i.pravatar.cc/150?img=5',
      role: 'STAFF',
      status: 'ACTIVE'
    },
    {
      id: '6',
      username: 'james_miller',
      email: 'james.miller@example.com',
      fullName: 'James Miller',
      phone: '0978123456',
      avt: 'https://i.pravatar.cc/150?img=6',
      role: 'USER',
      status: 'INACTIVE'
    },
    {
      id: '7',
      username: 'olivia_brown',
      email: 'olivia.brown@example.com',
      fullName: 'Olivia Brown',
      phone: '0888123127',
      avt: 'https://i.pravatar.cc/150?img=7',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '8',
      username: 'benjamin_taylor',
      email: 'benjamin.taylor@example.com',
      fullName: 'Benjamin Taylor',
      phone: '0911222338',
      avt: 'https://i.pravatar.cc/150?img=8',
      role: 'ADMIN',
      status: 'ACTIVE'
    },
    {
      id: '9',
      username: 'chloe_martin',
      email: 'chloe.martin@example.com',
      fullName: 'Chloe Martin',
      phone: '0903344559',
      avt: 'https://i.pravatar.cc/150?img=9',
      role: 'STAFF',
      status: 'INACTIVE'
    },
    {
      id: '10',
      username: 'daniel_clark',
      email: 'daniel.clark@example.com',
      fullName: 'Daniel Clark',
      phone: '0966778810',
      avt: 'https://i.pravatar.cc/150?img=10',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '11',
      username: 'grace_lewis',
      email: 'grace.lewis@example.com',
      fullName: 'Grace Lewis',
      phone: '0833123111',
      avt: 'https://i.pravatar.cc/150?img=11',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '12',
      username: 'henry_walker',
      email: 'henry.walker@example.com',
      fullName: 'Henry Walker',
      phone: '0922233312',
      avt: 'https://i.pravatar.cc/150?img=12',
      role: 'STAFF',
      status: 'ACTIVE'
    },
    {
      id: '13',
      username: 'isabella_hall',
      email: 'isabella.hall@example.com',
      fullName: 'Isabella Hall',
      phone: '0977001113',
      avt: 'https://i.pravatar.cc/150?img=13',
      role: 'USER',
      status: 'INACTIVE'
    },
    {
      id: '14',
      username: 'jackson_allen',
      email: 'jackson.allen@example.com',
      fullName: 'Jackson Allen',
      phone: '0899887714',
      avt: 'https://i.pravatar.cc/150?img=14',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '15',
      username: 'lily_young',
      email: 'lily.young@example.com',
      fullName: 'Lily Young',
      phone: '0912349915',
      avt: 'https://i.pravatar.cc/150?img=15',
      role: 'STAFF',
      status: 'ACTIVE'
    },
    {
      id: '16',
      username: 'matthew_king',
      email: 'matthew.king@example.com',
      fullName: 'Matthew King',
      phone: '0955667716',
      avt: 'https://i.pravatar.cc/150?img=16',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '17',
      username: 'natalie_scott',
      email: 'natalie.scott@example.com',
      fullName: 'Natalie Scott',
      phone: '0901112217',
      avt: 'https://i.pravatar.cc/150?img=17',
      role: 'ADMIN',
      status: 'INACTIVE'
    },
    {
      id: '18',
      username: 'oscar_green',
      email: 'oscar.green@example.com',
      fullName: 'Oscar Green',
      phone: '0844556618',
      avt: 'https://i.pravatar.cc/150?img=18',
      role: 'USER',
      status: 'ACTIVE'
    },
    {
      id: '19',
      username: 'paula_adams',
      email: 'paula.adams@example.com',
      fullName: 'Paula Adams',
      phone: '0929988719',
      avt: 'https://i.pravatar.cc/150?img=19',
      role: 'STAFF',
      status: 'INACTIVE'
    },
    {
      id: '20',
      username: 'quentin_nelson',
      email: 'quentin.nelson@example.com',
      fullName: 'Quentin Nelson',
      phone: '0977554420',
      avt: 'https://i.pravatar.cc/150?img=20',
      role: 'USER',
      status: 'ACTIVE'
    }
  ]

  return (
    <div>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibolds'>All User</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
