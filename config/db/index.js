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
        return this.connection.query('DELETE FROM department WHERE id =?', payload);
    }
    addRole(payload) {
        return this.connection.query('INSERT INTO role SET ?', payload);
    };
    viewRole() {
        return this.connection.query('SELECT role.id, title, salary, department.name FROM role LEFT JOIN department ON role.deparment_id = department.id');
    };
    deleteRole(payload) {
        return this.connection.query('DELETE FROM role WHERE id =?', payload);
    }
    addEmployee(payload) {
        return this.connection.query('INSERT INTO employee SET ?', payload);
    };
    viewEmployees() {
        return this.connection.query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager, role.title FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.deparment_id = department.id LEFT JOIN employee manager ON manager_id=manager.id');
    };
    deleteEmployee(payload) {
        return this.connection.query('DELETE FROM employee WHERE id =?', payload);
    }
};

module.exports = new DB(connection)
