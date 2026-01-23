import ProfileContent from '@/components/user/profile/profile-content'
import ProfileHeader from '@/components/user/profile/profile-header'

export default function ProfilePage() {
  return (
    <div className='mx-auto max-w-4xl space-y-6 px-4 py-10'>
      <ProfileHeader />
      <ProfileContent />
    </div>
  )
}
