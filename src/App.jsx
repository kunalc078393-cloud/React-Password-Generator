import { useState, useEffect, useCallback, useRef, use } from "react"
import './App.css'




function App() {

  const [length, setlength] = useState(0);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref = useRef(null);

  const copytoclipboard = useCallback(() => {
    passwordref.current.select(passwordref);
    window.navigator.clipboard.writeText(password);

  }, [password]);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+{}|?><"

    for (let i = 0; i < length; i = i + 1) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }

    setpassword(pass);


  }, [length, numberAllowed, characterAllowed]);



  useEffect(() => { passwordGenerator() }, [length, numberAllowed, characterAllowed])


  return (
    <>
      <div
        className="w-full py-4 flex justify-center"
      >
        <div
          className="p-2 mt-2 bg-gray-500 flex flex-col"
        >
          <div
            className="p-2 flex gap-1"
          >
            <input
              className="w-full rounded bg-white text-gray-700 p-2"
              type="text"
              readOnly
              value={password}
              placeholder="password"
              ref={passwordref}

            />
            <button
              className="p-1 text-white bg-blue-600 rounded "

              onClick={() => copytoclipboard()}
            >
              copy
            </button>


          </div>
          <div
            className="p-2 flex gap-2"
          >
            <input
              type="range"
              min="1"
              max="100"
              value={length}
              onChange={(e) => { setlength(e.target.value) }}

            />

            <label className="text-orange-400 " >Length ({length})</label>

            <div
              className="text-orange-400 inline-block flex gap-1"
            >
              <label className="m-1" >Numbers</label>
              <input type="checkbox" onChange={() => { setnumberAllowed(!numberAllowed) }} />
            </div>

            <div
              className="text-orange-400 inline-block "
            >
              <label className="m-1">Numbers</label>
              <input type="checkbox" onChange={() => { setcharacterAllowed(!characterAllowed) }} />
            </div>

          </div>
        </div>


      </div>
    </>
  );
}

export default App
