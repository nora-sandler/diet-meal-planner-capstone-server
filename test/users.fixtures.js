function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'admin_node',
            password: 'password',

        },
        {
            id: 2,
            username: 'JohnySmith',
            password: '123456',

        },
        {
            id: 3,
            username: 'user',
            password: 'aaAA11!!',

        },
    ];
}; 

function makeMaliciousUser() {
    const maliciousUser = {
        id: 1,
        username: 'Naughty naughty very naughty <script>alert("xss");</script>',
        password: 'Naughty naughty very naughty <script>alert("xss");</script>',

    }
    const expectedUser = {
        ...maliciousUser,
        username: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        password: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        
    }
    return {
        maliciousUser,
        expectedUser,
    }
}

module.exports = {
    makeUsersArray,
    makeMaliciousUser,
}