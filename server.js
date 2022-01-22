const db = require('./config/db');
const inquirer = require('inquirer');

const menu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: "choice",
                message: 'Please select an option below?',
                // name: 'license',
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Delete Department"
                ]
            }])
        .then((response) => {
            switch (response.choice) {
                case 'View all departments':
                    viewAllDepartments()
                    break;
                case 'View all roles':
                    viewAllRoles()
                    break;
                case 'View all employees':
                    viewAllEmployees()
                    break;
                case 'Add a department':
                    addDepartment()
                    break;
                case 'Add a role':
                    addRole()
                    break;
                case 'Add an employee':
                    addEmployee()
                    break;
                case 'Update an employee role':
                    updateEmployeeRole()
                    break;
                case 'Delete Department':
                    deleteDepartment()
                    break;
                default:
                    break;
            }
        });
};

menu()

const viewAllDepartments = async () => {
    const departments = await db.viewDept()
    console.table(departments)
    //db.connection.end()
    menu()
};
// viewAllDepartments()

const addDepartment = async () => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'name of department',
        }
    ])
    await db.addDept(department);
    console.log('Department has been added');
    //db.connection.end()
    menu()
}
// addDepartment()

const viewAllRoles = async () => {
    const roles = await db.viewRole()
    console.table(roles)
    //db.connection.end()
    menu()
};

const deleteDepartment = async () => {
    let departments = [];
    let deptTable = await db.viewDept();
    for (let i = 0; i < deptTable.length; i++) {
        departments.push({ name: deptTable[i].name, value: deptTable[i].id });
    }
    const role = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which department would you like to remove?',
            choices: departments
        }
    ])
    await db.deleteDept(role);
    console.log('Department has been deleted.');
    //db.connection.end()
    menu()
}
// viewAllRoles()

const addRole = async () => {
    let departments = [];
    let deptTable = await db.viewDept();
    for (let i = 0; i < deptTable.length; i++) {
        departments.push({ name: deptTable[i].name, value: deptTable[i].id });
    }
    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'name of role',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'amount of salary',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'name of department',
            choices: departments
        }
    ])
    await db.addRole(role);
    console.log('Role has been added');
    //db.connection.end()
    menu()
}
// addDepartment()

const updateEmployeeRole = async () => {
    let roles = [];
    let roleTable = await db.viewRole();
    for (let i = 0; i < roleTable.length; i++) {
        roles.push({ name: roleTable[i].name, value: roleTable[i].id });
    }
    let employeeList = [];
    let employeesTable = await db.viewEmployees();
    for (let i = 0; i < employeesTable.length; i++) {
        //console.log(employeesTable[i])
        employeeList.push({ name: employeesTable[i].employee, value: employeesTable[i].id });
    }
    //console.log(employeeList);
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Choose an employee?',
            choices: employeeList,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employees new role?',
            choices: roles,
        },

    ])
    console.log(employee)
    await db.updateEmployeeNewRole(employee);
    //console.log('Employee role has been updated');
    //db.connection.end()
    menu()
}

const addEmployee = async () => {
    let roles = [];
    let roleTable = await db.viewRole();
    for (let i = 0; i < roleTable.length; i++) {
        roles.push({ name: roleTable[i].name, value: roleTable[i].id });
    }
    let employeeList = [];
    let employeesTable = await db.viewEmployees();
    for (let i = 0; i < employeesTable.length; i++) {
        //console.log(employeesTable[i])
        employeeList.push({ name: employeesTable[i].employee, value: employeesTable[i].id });
    }
    //console.log(employeeList);
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employees role?',
            choices: roles,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager?',
            choices: employeeList,
        }
    ])
    await db.addEmployee(employee);
    console.log('Employee has been added');
    //db.connection.end()
    menu()
}
const viewAllEmployees = async () => {
    const employees = await db.viewEmployees()
    console.table(employees)
    //db.connection.end()
    menu()
};
// viewAllEmployees()







