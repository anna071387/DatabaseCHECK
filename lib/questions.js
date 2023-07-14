const questions = [
    {
        type: "input"
        message: "What would you like to do?"
        name: "contents"
    },
    {
        type: "input"
        message: "What is the name of the department?"
        name: "contents"
    },
    {
        type: "input"
        message: "What would you like to do?"
        name: "contents"
    },
    {
        type: "input"
        message: "What is the name of the role?"
        name: "contents"
    },
    {
        type: "input"
        message: "What is the salary of the role?"
        name: "contents"
    },
    {
        type: "list",
        message: "Which Department does the role belong to?",
        name: "department_db",
        choices: [
            {
                name: 'Engineering',
            },
            {
                name: 'FInancial',
            },
            {
                name: 'Legal',
            },
            {
                name: 'Sales',
            },
            {
                name: 'Service',
            },
        ]
    }
];
module.exports = questions;