import { useReducer, useEffect } from "react"
import "./App.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite || state.currentOperand === "Error") {
        if (payload.digit === ".") {
          return {
            ...state,
            currentOperand: "0.",
            overwrite: false,
          }
        }
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state
      }
      if (payload.digit === "." && (state.currentOperand == null || state.currentOperand === "")) {
        return {
          ...state,
          currentOperand: "0.",
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === "Error") return state;
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite || state.currentOperand === "Error") {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
      
    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      if (current === 0) return "Error"
      computation = prev / current
      break
  }
  
  if (computation === "Error") return "Error";
  
  // To avoid extremely long decimals
  computation = Math.round(computation * 10000000000) / 10000000000;
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return
  if (operand === "Error") return "Error"
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e
      if (/[0-9.]/.test(key)) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } })
      } else if (["+", "-", "*", "/"].includes(key)) {
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation: key === "/" ? "÷" : key },
        })
      } else if (key === "Enter" || key === "=") {
        e.preventDefault(); // prevent form submit or button click if focused
        dispatch({ type: ACTIONS.EVALUATE })
      } else if (key === "Backspace") {
        dispatch({ type: ACTIONS.DELETE_DIGIT })
      } else if (key === "Escape") {
        dispatch({ type: ACTIONS.CLEAR })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="calculator-container">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand">{formatOperand(currentOperand) || "0"}</div>
        </div>
        <button
          className="span-two action-btn clear"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          className="action-btn del"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </button>
        <button
          className="operation-btn"
          onClick={() =>
            dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "÷" } })
          }
        >
          ÷
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "7" } })}
        >
          7
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "8" } })}
        >
          8
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "9" } })}
        >
          9
        </button>
        <button
          className="operation-btn"
          onClick={() =>
            dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } })
          }
        >
          *
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "4" } })}
        >
          4
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "5" } })}
        >
          5
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "6" } })}
        >
          6
        </button>
        <button
          className="operation-btn"
          onClick={() =>
            dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } })
          }
        >
          +
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "1" } })}
        >
          1
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "2" } })}
        >
          2
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "3" } })}
        >
          3
        </button>
        <button
          className="operation-btn"
          onClick={() =>
            dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } })
          }
        >
          -
        </button>
        <button
          className="digit-btn dot"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "." } })}
        >
          .
        </button>
        <button
          className="digit-btn"
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "0" } })}
        >
          0
        </button>
        <button
          className="span-two equals-btn"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  )
}

export default App
