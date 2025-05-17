import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='bg-primary grow text-red-700 '>
        main content here
      </main>
      <Footer />
    </div>
  )
}

export default App
