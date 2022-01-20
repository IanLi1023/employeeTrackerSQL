const db  = require('./config/db');
const inquirer = require('inquirer');

const viewDepartments = async() => {
const departments = await db.viewDept()
console.table(departments)
db.connection.end()
};
viewDepartments()

const addDepartment = async() => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'name of department',
        }
    ])
    await db.addDept(department);
    console.log('Department has been added');
    db.connection.end()
}
// addDepartment()