import './scss/App.css'
import Chatbot from "@/components/Chatbot.jsx";

function App() {

    return (
       <div className='flex flex-none flex-col min-h-full'>
        <div className='header backdrop-blur-lg'>
            <div className='logo-container'></div>
        </div>
        <div className='flex flex-1 flex-col h-full w-full max-w-3xl mx-auto px-4 gap-1 pt-4 pb-2 '>
            <Chatbot/>
        </div>
           <div className='copyright text-blue-300'>&copy; Team Bot Squad 2025</div>
       </div>
    )
}

export default App
