import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()-_+=[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClicpboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!");
    passwordRef.current?.select() 
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 flex items-center justify-center px-2">
  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-xl px-4 py-6 text-white border border-white/20">
    
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-400">
      🔐 Password Generator
    </h1>

    {/* Password display and copy */}
    <div className="flex flex-col sm:flex-row shadow-inner rounded-lg overflow-hidden mb-6 bg-white/20">
      <input
        type="text"
        value={password}
        className="outline-none bg-transparent w-full py-2 px-4 text-base sm:text-lg placeholder-white text-white"
        placeholder="Generated Password"
        readOnly
        ref={passwordRef}
      />
      <button
        onClick={copyPasswordToClicpboard}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 transition-all"
      >
        Copy
      </button>
    </div>

    {/* Controls */}
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <label htmlFor="length" className="flex-1">
          Length: <span className="text-yellow-400">{length}</span>
        </label>
        <input
          type="range"
          id="length"
          min={6}
          max={30}
          value={length}
          className="cursor-pointer w-full sm:w-3/5 accent-orange-400"
          onChange={(e) => setlength(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
          className="accent-orange-400"
        />
        <label htmlFor="numberInput">Include Numbers</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={charAllowed}
          id="characterInput"
          onChange={() => setCharAllowed((prev) => !prev)}
          className="accent-orange-400"
        />
        <label htmlFor="characterInput">Include Special Characters</label>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App;
