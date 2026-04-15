import { questionsData } from "../componentsQuiz/questions";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const initialState = {
  questions: shuffleArray(
    questionsData.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
  ),
  currentQuestionIndex: 0,
  score: 0,
  finished: false,
  lastResult: null
};

const quizReducer = (state = initialState, action) => {
  switch(action.type){
    case "ANSWER_QUESTION":
      const isCorrect =
        state.questions[state.currentQuestionIndex].correctAnswer === action.payload;
      return { ...state, score: isCorrect ? state.score + 1 : state.score };

    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestionIndex + 1;
      if(nextIndex >= state.questions.length){
        const percentage = Math.round((state.score / state.questions.length) * 100);
        return { ...state, finished: true, lastResult: { score: state.score, percentage, success: percentage >= 80 } };
      }
      return { ...state, currentQuestionIndex: nextIndex };

    case "REPLAY_QUIZ":
      return {
        ...initialState,
        questions: shuffleArray(
          questionsData.map(q => ({
            ...q,
            options: shuffleArray(q.options)
          }))
        ),
        currentQuestionIndex: 0,
        score: 0,
        finished: false,
        lastResult: null
      };

    default: return state;
  }
};

export default quizReducer;
