import {useState} from 'react'
import '../scss/App.css'

function App() {
    const [count, setCount] = useState(0)

    return (


        <div className="background-container">
            <div className="header">
                <div className="logo-container"/>
            </div>

            <div className='chatContainer'>
                <section>
                    <div>
                        <h1> Ask me anything...</h1>
                    </div>
                </section>
                <section>
                    <div className='chatInputContainer'>
                        <textarea inputMode='text' className='textInput' aria-autocomplete='inline'/>
                        <button> Send</button>
                    </div>
                </section>
            </div>

            <div className='bot_container bot_logo'/>
        </div>
    )
}

export default App
