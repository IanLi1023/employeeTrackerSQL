const connection = require('./config');

class DB {
    constructor(connnection) {
        this.connection = connection;
    }
    addDept(payload) {
        return this.connection.query('INSERT INTO department SET ?', payload);
    };
    viewDept() {
        return this.connection.query('SELECT * FROM department');
    };
    deleteDept(payload) {
        return this.connection.query('DELETE FROM department WHERE ?', payload);
    }
    addRole(payload) {
        return this.connection.query('INSERT INTO role SET ?', payload);
    };
    viewRole() {
        return this.connection.query('SELECT role.id, title, salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id');
    };
    deleteRole(payload) {
        return this.connection.query('DELETE FROM role WHERE ?', payload);
    }
    addEmployee(payload) {
        return this.connection.query('INSERT INTO employee SET ?', payload);
    };
    viewEmployees() {
        return this.connection.query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager, role.title FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
    };
    deleteEmployee(payload) {
        return this.connection.query('DELETE FROM employee WHERE ?', payload);
    }
    updateEmployeeNewRole(payload) {
        let id = payload.id;
        let data = {role_id: payload.role_id};
        return this.connection.query(`UPDATE employee SET ? WHERE id='`+id+`'`, data);
     }
     updateManager(payload) {
        let id = payload.id;
        let data = {manager_id: payload.manager_id};
        return this.connection.query(`UPDATE employee SET ? WHERE id='`+id+`'`, data);
     }
     viewByManager(payload) {
        let id = payload.manager_id;
        console.log(id);
        return this.connection.query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager, role.title FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE employee.manager_id = ?', id);
    };
    viewByDepartment(payload) {
        let id = payload.id;
        console.log(id);
        return this.connection.query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager, role.title FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE department.id = ?', id);
    };
    budget(payload) {
        let id = payload.id;
        console.log(id);
        return this.connection.query('SELECT SUM(salary) as TotalBudget FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id WHERE department.id = ?', id);
    };
};

module.exports = new DB(connection)
