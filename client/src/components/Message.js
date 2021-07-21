import React from 'react';
import './Message.css'

const Message = (props) => {
    return (
        <div>
            <div class={props.userName === props.name ? "message" : "message message-other"}>
                <div class="message-header">
                    <strong class={props.userName === props.name ? "message-name" : "message-name message-text-other"}>{props.name}</strong>
                    <div class="message-time"><span>{props.time}</span></div>
                </div>
                <div class={props.userName === props.name ? "message-body" : "message-body message-text-other"}>
                    <span>{props.message}</span>
                </div>
            </div>
        </div>
    )
}

export default Message; 