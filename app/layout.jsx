import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
  title: "Bella's To Do List",
  description: 'You can now add, remove and update to do events that are very very important to you!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className=''>

          <Nav />

          <hr className='bg-gray-700 h-0.5 border-none' />

          { children }

        </body>
      </Provider>
    </html>
  )
}
