import { useState, useEffect } from "react";

export default function Quiz1() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [quizItems, setQuizItems] = useState([
    { id: 1, answer: "Are", userAnswer: "" },
    { id: 2, answer: "'m,am", userAnswer: "" },
    { id: 3, answer: "am,'m", userAnswer: "" },
    { id: 4, answer: "'s,is", userAnswer: "" },
    { id: 5, answer: "are", userAnswer: "" },
    { id: 6, answer: "'re,are", userAnswer: "" },
    { id: 7, answer: "'s,is", userAnswer: "" },
    { id: 8, answer: "is,'s", userAnswer: "" },
    { id: 9, answer: "'m,am", userAnswer: "" },
    { id: 10, answer: "'m,am", userAnswer: "" },
    { id: 11, answer: "Are", userAnswer: "" },
    { id: 12, answer: "am", userAnswer: "" },
    { id: 13, answer: "is,'s", userAnswer: "" },
    { id: 14, answer: "'s,is", userAnswer: "" },
    { id: 15, answer: "'re,are", userAnswer: "" },
    { id: 16, answer: "is,'s", userAnswer: "" },
  ]);

  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const options = ["am", "is", "are", "'m", "'s", "'re"];

  function checkAnswers() {
    let correct = 0;
    quizItems.forEach((item) => {
      const correctAnswers = item.answer.toLowerCase().split(",");
      if (correctAnswers.includes(item.userAnswer.toLowerCase())) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  }

  function retry() {
    setQuizItems(quizItems.map((item) => ({ ...item, userAnswer: "" })));
    setShowResults(false);
    setScore(0);
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl text-gray-800 dark:text-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Quiz: Verbo "To Be"
        </h1>
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-2xl"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <p className="text-gray-700 mt-2">
          🔤 Complete the conversations with{" "}
          <code className="bg-gray-200 p-1 rounded-md">am, is, are, 'm, 's, 're</code>.
        </p>
      </div>

      <form className="space-y-6">
        {quizItems.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
            <p className="font-semibold text-gray-700 mb-3">Question {index + 1}</p>
            <select
              value={item.userAnswer}
              disabled={showResults}
              onChange={(e) =>
                setQuizItems((prev) =>
                  prev.map((q) =>
                    q.id === item.id ? { ...q, userAnswer: e.target.value } : q
                  )
                )
              }
              className={`quiz-select p-2 rounded-md shadow-sm border-gray-300 transition 
                bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 
                ${showResults && item.userAnswer.toLowerCase() !== item.answer.split(",")[0].toLowerCase()
                  ? "text-red-600 line-through"
                  : "text-gray-800"
                }`}
            >
              <option value="">...</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {showResults && (
              <span className="ml-2">
                {quizItems[index].userAnswer &&
                quizItems[index].answer
                  .toLowerCase()
                  .split(",")
                  .includes(quizItems[index].userAnswer.toLowerCase()) ? (
                  <span className="text-green-600 font-semibold">✔</span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    ❌ ({item.answer.split(",")[0]})
                  </span>
                )}
              </span>
            )}
          </div>
        ))}
      </form>

      <div className="mt-8 text-center">
        {!showResults && (
          <button
            type="button"
            onClick={checkAnswers}
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Check Answers
          </button>
        )}
        {showResults && (
          <>
            <div className="mt-4 text-lg font-medium">
              {score === quizItems.length
                ? `🎉 Excelente! Você acertou todas ${score}/${quizItems.length}!`
                : `Você acertou ${score}/${quizItems.length}.`}
            </div>
            <button
              type="button"
              onClick={retry}
              className="mt-4 bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
