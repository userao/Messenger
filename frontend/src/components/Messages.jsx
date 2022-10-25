import React, { useEffect, useRef } from 'react';
import filter from 'leo-profanity';

const Messages = ({ messages }) => {
  const bottom = useRef(null);
  useEffect(() => {
    bottom.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat-messages overflow-auto px-5" id="message-box">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {filter.clean(message.body)}
        </div>
      ))}
      <div ref={bottom} />
    </div>
  );
};

export default Messages;
