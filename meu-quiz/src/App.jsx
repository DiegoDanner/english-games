import './App.css'
import Quiz1 from "./Quiz1";

function App() {
  return (
    <div className="pt-20">
      <header className="fixed top-0 left-0 w-full z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center gap-6">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100">[LOGO]</div>
        <a href="/" className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" title="Back to Home">Menu</a>
      </header>
      <main className="p-4">
        <Quiz1 texto="HELLO!!" />
      </main>
    </div>
  );
}

export default App
