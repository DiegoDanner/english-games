import { useState } from 'react'
import './App.css'
import Quiz1 from "./quizzes/Quiz1";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Quiz1 texto="HELLO!!"/>
    </div>
  );

    </>
  )
}

export default App
