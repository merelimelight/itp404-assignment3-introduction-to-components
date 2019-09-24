import React from 'react';

export default function RedditCard(props)
{
    let post = props.post;
    return (
        <div>
            <a href={post.data.url} target='_blank'> {post.data.title} </a>
            <p> {post.data.author} </p>
            <p> {post.data.ups.toLocaleString()} </p>
            <p> {post.data.num_comments > 0 ? post.data.num_comments.toLocaleString() : 'No comments'}</p>
        </div>
    );
}