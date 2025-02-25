/* Implemented  password generator app to demonstrate useCase of useMemo,useCallback,useRef,useEffect,useState hooks  */
import './App.css';
import React,{useState,useEffect,useCallback,useMemo,useRef} from 'react';
import PasswordGenerator from './components/PasswordGenerator';
function App() {

  const [password,setPassword]=useState('');//state to handle change in password
  const [length,setLength] = useState(9);//initially are length of password is 9 (must be minimum 9)
  const [areNumbersAllowed,setAreNumbersAllowed]=useState(false);//state for handling numbers
  const [areCharsAllowed,setAreCharsAllowed]=useState(false);//state for handling special characters

          //giving reference to password
          const passwordRef=useRef(null);

            // Memoized Character Set to hold the expensive str operation as it will optimize the return value of the charSet
            const charSet = useMemo(()=> {
          let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          if(areNumbersAllowed){
            str += '0123456789';
          }
          if(areCharsAllowed){
            str += '!@#$%^&*()_+';
          }
          return str;
            },[areNumbersAllowed,areCharsAllowed])

            //using the memoized return value of charSet,we will now use useCallback hook to make sure we store the common function of  generating the password as we need to generate password again and again(any change in input ).
            const generateNewPassword = useCallback(()=>{
              let passwrd='';
              //random function to generate password
              for(let i=1;i<=length;i++){
                const char=Math.floor(Math.random() * charSet.length -1 );
                //add the characters to the orignal string.
                passwrd += charSet.charAt(char);
              }
              setPassword(passwrd);
            },[charSet,setPassword,length])

           //to automatically generate password (re render components if any inputs are changed,we use useEffect hook)
           useEffect(()=>{
               generateNewPassword();
           },[length,areCharsAllowed,areNumbersAllowed,generateNewPassword])

          //function to copy password to Clipboard
          const copyPasswordToClipboard = () => 
            {
            //use window navigator clipboard  to access text of input 
            window.navigator.clipboard.writeText(password);
            passwordRef.current.select();//select method from useRef hook helps in selecting the text of the input.
            alert('Password Copied to Clipboard,you can now use it !');
            console.log(`Password Generated: ${passwordRef.current.value}`);
           const button= document.querySelector('button');
          button.style.boxShadow =' 0 5px 5px 5px rgb(1, 177, 33)'; /* Soft glow */
          button.style.fontFamily = 'Amaranth'
           if(button.innerText === 'Copy'){
            button.innerText = 'Copied !';
           }
          }

            return (
              <>
                              <div className="mainContainer">
                                        <h1 className="heading">Random Password Generator</h1>
                                        <div className="passwordText">
                                          <PasswordGenerator 
                                        
                                            type="password"
                                            className="password"
                                            value={password}
                                            placeholder="Password.."
                                            readOnly
                                            ref={passwordRef}
                                          />
                                          <button
                                            className="copyToClipboardButton"
                                            onClick={copyPasswordToClipboard}//onCLick functionality to trigger change and give a msg to user,text copied
                                          >
                                            Copy
                                          </button>
                                        </div>
                          
                                      <div className="inputsForPassword">
                                        <div className="length">
                                          <input
                                            type="range"
                                            className="range"// input type is range,as the range  of password changes,our range will change
                                            min={8}
                                            max={100}
                                            value={length}
                                            onChange={(e) => setLength(e.target.value)}//setting the length of the password
                                            name=""
                                            id=""
                                          />
                                          <label htmlFor="length">Length : {length}</label>
                                        </div>
                                        <div className="numbersCheckBox">
                                          <input
                                            type="checkbox"
                                            className="numbersCheckbox"
                                            onChange={() => {
                                              //change prev value
                                              setAreNumbersAllowed((prev) => !prev);//changing the prev value.
                                            }}
                                          />
                                          <label htmlFor="number">Numbers</label>
                                        </div>

                                        <div className="charactersCheckBox">
                                          <input
                                            type="checkbox"
                                            className="charactersCheckbox"
                                            defaultChecked = {areCharsAllowed}
                                            onChange={() => {
                                              //change prev value
                                              setAreCharsAllowed(
                                                (prev) => !prev
                                              ); //changing the prev value.
                                            }}
                                          />
                                          <label htmlFor="specialCharacters"> Special Characters</label>
                                        </div>
                                      </div>
                          </div>
                 </>
            );
}

export default App;
