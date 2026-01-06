import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import NotFound404 from '@/pages/NotFound404'
import TestPage from '@/pages/TestPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

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
          <Route path='/' element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
