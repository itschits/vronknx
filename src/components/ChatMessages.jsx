import Markdown from 'react-markdown';
import useAutoScroll from '@/hooks/useAutoScroll';
import Spinner from '@/components/Spinner';
import userIcon from '@/assets/office-man.png';
import errorIcon from '@/assets/error.svg';
import robotIcon from '@/assets/robot.png';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
      <div ref={scrollContentRef} className='grow space-y-4'>
        {messages.map(({ role, content, loading, error }, idx) => (
            <div key={idx} className='flex items-start gap-4 py-4 px-3 rounded-xl text-white bg-primary-blue/15'>
              {role === 'user' ?
                  (<img
                          className='h-[26px] w-[30px] shrink-0'
                          src={userIcon}
                          alt='user2'
                  />) :
                  (<img
                      className='h-[40px] w-[35px] shrink-0'
                      src={robotIcon}
                      alt='robot'
                  />)}
              <div>
                <div className='markdown-container font-barclay'>
                  {(loading && !content) ? <Spinner />
                      : (role === 'assistant')
                          ? <Markdown>{content}</Markdown>
                          : <div className='whitespace-pre-line'>{content}</div>
                  }
                </div>
                {error && (
                    <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                      <img className='h-5 w-5' src={errorIcon} alt='error' />
                      <span>Error generating the response</span>
                    </div>
                )}
              </div>
            </div>
        ))}
      </div>
  );
}

export default ChatMessages;