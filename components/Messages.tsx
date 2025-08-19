import { TAiMessage, TGenericMessage, TUserMessage } from '@/store/chatAtoms';
import Destination from './Destination';

type AiMessageProps = {
  message: TAiMessage;
};

function AiMessage({ message }: AiMessageProps) {
  const {
    title,
    destinations,
    itinerary,
    // chatId, timestamp, id, sender, text
  } = message;

  const noProblems = !!destinations && !!itinerary && !!title;

  return (
    <div className='border-gray-500 border-b-1 pb-8 flex flex-col gap-5'>
      {noProblems ? (
        <>
          <p className='text-3xl font-semibold text-center'>{title}</p>
          {/* <strong>Destinations</strong> */}
          <div className='flex flex-row flex-wrap gap-3'>
            {destinations.map((destination) => (
              <Destination
                key={destination.name}
                destination={destination}
              />
            ))}
          </div>
          {/* <strong>Itinerary</strong> */}
          <p>{message.itinerary}</p>
        </>
      ) : (
        <p>Issue with AI response. Please try again.</p>
      )}
    </div>
  );
}

type UserMessageProps = {
  message: TUserMessage;
};

function UserMessage({ message }: UserMessageProps) {
  const {
    // destinations,
    // itinerary,
    text,
    // chatId, timestamp, id, sender, text
  } = message;

  return (
    <div className='ml-auto px-4 py-3 rounded-xl max-w-[70%] bg-gray-500/20 text-white'>
      {text}
    </div>
  );
}

type MessageProps = {
  message: TGenericMessage;
};

function Message({ message }: MessageProps) {
  return (
    <div
      key={message.id}
      className={`flex`}
    >
      {message.sender === 'ai' ? (
        <AiMessage
          key={message.id}
          message={message}
        />
      ) : (
        <UserMessage
          key={message.id}
          message={message}
        />
      )}
    </div>
  );
}

export default Message;
