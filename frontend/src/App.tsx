import UserPage from '@/pages/admin/manage-user/page'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardHome from '@/pages/admin/dashboard/content/DashBoardHome'
import LayoutAdmin from '@/pages/admin/LayoutAdmin'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import NotFound404 from '@/pages/NotFound404'
import TestPage from '@/pages/TestPage'
import ProfilePage from '@/pages/user/ProfilePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import CategoryPage from '@/pages/admin/manage-category/page'
import BrandPage from '@/pages/admin/manage-brand/page'

function App() {
  return (
    <>
      <Toaster
        richColors
        expand={false}
        position='bottom-right'
        duration={5000}
        visibleToasts={5}
        closeButton
      />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound404 />} />
          {/* TODO: tạo các public route */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          {/* TODO: tạo protected route */}
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/dashboard' element={<LayoutAdmin />}>
              <Route index element={<DashboardHome />} />
              <Route path='users' element={<UserPage />} />
              <Route path='categories' element={<CategoryPage />} />
              <Route path='brands' element={<BrandPage />} />
            </Route>
          </Route>
          <Route path='/' element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
