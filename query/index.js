const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    // if(type === 'PostCreated'){
    //     const {id, title} = data;

    //     posts[id] = {id, title, comments: []};
    // }
    // else if(type === 'CommentCreated'){
    //     const {id, content, postId, status} = data;

    //     posts[postId].comments.push({ id, content, status })
    // }
    // else if(type === 'CommentUpdated'){
    //     const { id, content, postId, status } = data;

    //     const post = posts[postId];

    //     const comment = post.comments.find(comment => {
    //         return comment.id === id;
    //     });

    //     comment.status = status;
    //     comment.content = content;
    // }
    switch (type) {
        case 'PostCreated':{
            let {id, title} = data;
            posts[id] = {id, title, comments: []};
            break;
        }

        case 'CommentCreated':{
            let {id, content, postId, status} = data;
            posts[postId].comments.push({ id, content, status })
            break;
        }

        case 'CommentUpdated':{
            let { id, content, postId, status } = data;

            const post = posts[postId];

            const comment = post.comments.find(comment => {
                return comment.id === id;
            });

            comment.status = status;
            comment.content = content;
            break;
        }
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening to 4002');

    try {
        
    } catch (error) {
        console.log(error.message);
    }
}); 