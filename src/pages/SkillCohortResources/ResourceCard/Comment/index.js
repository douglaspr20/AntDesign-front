import React from 'react'

const Comment = (props) => {
    const { comment } = props

    return <div>
        {comment.response}
    </div>
}

export default Comment