console.table(
`
 _____       ___  ___   _____   _       _____  __    __  _____   _____            ___  ___       ___   __   _       ___   _____   _____   _____   
| ____|     /   |/   | |  _  \\ | |     /  _  \\ \\ \\  / / | ____| | ____|          /   |/   |     /   | |  \\ | |     /   | /  ___| | ____| |  _  \\  
| |__      / /|   /| | | |_| | | |     | | | |  \\ \\/ /  | |__   | |__           / /|   /| |    / /| | |   \\| |    / /| | | |     | |__   | |_| |  
|  __|    / / |__/ | | |  ___/ | |     | | | |   \\  /   |  __|  |  __|         / / |__/ | |   / / | | | |\\   |   / / | | | |  _  |  __|  |  _  /  
| |___   / /       | | | |     | |___  | |_| |   / /    | |___  | |___        / /       | |  / /  | | | | \\  |  / /  | | | |_| | | |___  | | \\ \\  
|_____| /_/        |_| |_|     |_____| \\_____/  /_/     |_____| |_____|      /_/        |_| /_/   |_| |_|  \\_| /_/   |_| \\_____/ |_____| |_|  \\_\\ 

`);

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
                    "View employees by manager",
                    "View employees by department",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Update manager",
                    "Delete Department",
                    "Delete employee role",
                    "Delete employee",
                    "Total budget by department"
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
                case 'View employees by manager':
                    viewByManager()
                    break;
                case 'View employees by department':
                    viewByDepartment()
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
                case 'Update manager':
                    updateManager()
                    break;
                case 'Delete department':
                    deleteDepartment()
                    break;
                case 'Delete employee role':
                    deleteEmployeeRole()
                    break;
                case 'Delete employee':
                    deleteAnEmployee()
                    break;
                case 'Total budget by department':
                        budget()
                        break;   
                default:
                    console.log("invalid choice");
                    menu();
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

// viewAllRoles()

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
        roles.push({ name: roleTable[i].title, value: roleTable[i].id });
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
    //console.log(employee)
    await db.updateEmployeeNewRole(employee);
    console.log('Employee role has been updated');
    //db.connection.end()
    menu()
}

const deleteEmployeeRole = async () => {
    let roles = [];
    console.log("Is it stuck?")
    let roleTable = await db.viewRole();
    console.table(roleTable);
    for (let i = 0; i < roleTable.length; i++) {
        roles.push({ name: roleTable[i].title, value: roleTable[i].id });
    }
    console.log(roles);
    const role = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which role would you like to remove?',
            choices: roles,
        }
    ])
    await db.deleteRole(role);
    console.log('Role has been deleted.');
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

const deleteAnEmployee = async () => {
    let employees = [];
    let employeeTable = await db.viewEmployees();
    for (let i = 0; i < employeeTable.length; i++) {
        employees.push({ name: employeeTable[i].employee, value: employeeTable[i].id });
    }
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee would you like to remove?',
            choices: employees
        }
    ])
    await db.deleteEmployee(employee);
    console.log('Employee has been removed.');
    //db.connection.end()
    menu()
}


const updateManager = async () => {
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
            name: 'manager_id',
            message: 'Who is the employees new manager?',
            choices: employeeList
        },

    ])
    //console.log(employee)
    await db.updateManager(employee);
    console.log('Employee role has been updated');
    //db.connection.end()
    menu()
}

const viewByManager = async () => {
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
            name: 'manager_id',
            message: 'Select a manager?',
            choices: employeeList
        },

    ])
    //console.log(employee)
    let data = await db.viewByManager(employee);
    if (data.length == 0) {
        console.log ('This manager has no emploees!')
    } else    
    console.table(data);

    //db.connection.end()
    menu()
}

const viewByDepartment = async () => {
    let departmentList = [];
    let departmentTable = await db.viewDept();
    for (let i = 0; i < departmentTable.length; i++) {
        //console.log(employeesTable[i])
        departmentList.push({ name: departmentTable[i].name, value: departmentTable[i].id });
    }
    //console.log(employeeList);
    const department = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select a department?',
            choices: departmentList
        },

    ])
    //console.log(employee)
    let data = await db.viewByDepartment(department);
    if (data.length == 0) {
        console.log ('This department has no employees!')
    } else    
    console.table(data);

    //db.connection.end()
    menu()
}

const budget = async () => {
    let departmentList = [];
    let departmentTable = await db.viewDept();
    for (let i = 0; i < departmentTable.length; i++) {
        //console.log(employeesTable[i])
        departmentList.push({ name: departmentTable[i].name, value: departmentTable[i].id });
    }
    //console.log(employeeList);
    const department = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select a department?',
            choices: departmentList
        },

    ])
    //console.log(employee)
    let data = await db.budget(department);
    if (data.length == 0) {
        console.log ('This department has no employees, therefore no budget!')
    } else    
    console.table(data);


    //db.connection.end()
    menu()
}
