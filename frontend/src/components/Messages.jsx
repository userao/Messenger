import React, { useEffect, useRef } from 'react';
import useFilter from '../hooks/useFilter.js';

const Messages = ({ messages }) => {
  const filter = useFilter();
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
