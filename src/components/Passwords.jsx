import { useCallback, useEffect , useState, useRef} from "react";
import { FaRegCopy } from "react-icons/fa";

const PasswordGenerator = ()=>{
    const [uppercase, setUppercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [length, setLength] = useState(12);
    const [password, setPassword] = useState(12);
    const passwordRef = useRef(null);

    const generatePassword = useCallback(()=>{
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let str ='';

        let allChar = lowercaseChars;

        if(uppercase) allChar +=uppercaseChars;

        if(symbols) allChar+=symbolChars;
        if(numbers) allChar+=numberChars;
        
        for (let index = 1; index < length; index++) {
           const randomIndex = Math.floor(Math.random() * allChar.length);
            str+=allChar.charAt(randomIndex);
        }
        setPassword(str)

    }, [
        numbers, symbols,length,uppercase. setPassword
    ]);

    useEffect(()=>{
        generatePassword()   
    }, [length, symbols, numbers, uppercase, generatePassword])
    
    const clickHandler = ()=>{
        generatePassword()
    }


    const copyToClipBoard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    },[password])

    return (
        <>
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Password Generator</h1>

        <div className="mb-4">
        <label htmlFor="passwordLength" className="block text-sm font-medium text-gray-600">Password Length</label>
        <input type="number" className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300" min="4" max="50" value={length} onChange={(e)=>{setLength(e.target.value)}} />
        </div>

        <div className="mb-4">
        <label htmlFor="includeUppercase" className="flex items-center">
            <input type="checkbox" id="includeUppercase" className="mr-2" onChange={()=>setUppercase(!uppercase)}/>
            <span className="text-sm font-medium text-gray-600">Include Uppercase</span>
        </label>
        </div>

        <div className="mb-4">
        <label htmlFor="includeNumbers" className="flex items-center">
            <input type="checkbox" id="includeNumbers" className="mr-2" onChange={()=>setNumbers(!numbers)} />
            <span className="text-sm font-medium text-gray-600">Include Numbers</span>
        </label>
        </div>

        <div className="mb-4">
        <label htmlFor="includeSymbols" className="flex items-center">
            <input type="checkbox" id="includeSymbols" className="mr-2"  onChange={()=>setSymbols(!symbols)}/>
            <span className="text-sm font-medium text-gray-600">Include Symbols</span>
        </label>
        </div>

        <button id="generateBtn" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" onClick={clickHandler}>Generate Password</button>

        <div className="mt-4">
        <label htmlFor="generatedPassword" className="block text-sm font-medium text-gray-600">Generated Password</label>
        <div className="flex">

        <input type="text" id="generatedPassword" className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300" readonly value={password} ref={passwordRef}/>
        <button
            className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={copyToClipBoard} 
        >
            <FaRegCopy /> </button>
        </div>
        </div>
        </div>
        </>
    )
}

export default PasswordGenerator;