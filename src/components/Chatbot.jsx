import {useState} from 'react';
import {useImmer} from 'use-immer';
import api from '@/api';
import {parseSSEStream} from '@/utils';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import bot from '@/assets/11431338.webp';

function Chatbot() {
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useImmer([]);
    const [newMessage, setNewMessage] = useState('');

    const isLoading = messages.length && messages[messages.length - 1].loading;

    async function submitNewMessage() {
        const trimmedMessage = newMessage.trim();
        if (!trimmedMessage || isLoading) return;

        setMessages(draft => [...draft,
            {role: 'user', content: trimmedMessage},
            {role: 'assistant', content: '', sources: [], loading: true}
        ]);
        setNewMessage('');

        let chatIdOrNew = chatId;
        try {
            if (!chatId) {
                const {id} = await api.createChat();
                setChatId(id);
                chatIdOrNew = id;
            }

            const stream = await api.sendChatMessage(chatIdOrNew, trimmedMessage);
            for await (const textChunk of parseSSEStream(stream)) {
                setMessages(draft => {
                    draft[draft.length - 1].content += textChunk;
                });
            }
            setMessages(draft => {
                draft[draft.length - 1].loading = false;
            });
        } catch (err) {
            console.log(err);
            setMessages(draft => {
                draft[draft.length - 1].loading = false;
                draft[draft.length - 1].error = true;
            });
        }
    }

    return (
        <div className='grow flex flex-col gap-6 pt-6'>
            {messages.length === 0 && (
                <div className='mt-3 font-urbanist place-items-center text-primary-blue text-xl font-light space-y-2'>
                    <img src={bot} className='w-64 bigBot' alt='bot'/>
                    <p>Welcome!</p>
                    <p>I am powered by the latest technology reports from many services.</p>
                    <p>Ask me anything to get help on current issues.</p>
                </div>
            )}
            {messages.length !== 0 && (<header className='sticky top-0 shrink-0 z-20'>
                <div className='flex flex-col h-full w-full gap-1 pt-4 pb-2'>
                    <h1 className='font-urbanist text-[1.65rem] font-semibold text-blue-300'>Ask anything chatbot</h1>
                </div>
            </header>)}

            <ChatMessages
                messages={messages}
                isLoading={isLoading}
            />
            <ChatInput
                newMessage={newMessage}
                isLoading={isLoading}
                setNewMessage={setNewMessage}
                submitNewMessage={submitNewMessage}
            />
            {messages.length !== 0 && (<div className='bot_container bot_logo'/>)}
        </div>
    );
}

export default Chatbot;