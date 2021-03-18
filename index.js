/*
Employee-tracker:
1. Build a database (refer to the visual example in the readme file)
2. Create seeds(prepopulate the database with values)
3. Create the start file that would consist of prompts to interact with the application and database.
*/
const inquirer = require('inquirer')
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Goodmorning314045%',
  database: 'organization_db',
});

const init = () => {
    console.log(`                                                 
  ____            _            _____ _ ___ ___ _ _     
 |    \ _ _ ___ _| |___ ___   |     |_|  _|  _| |_|___ 
 |  |  | | |   | . | -_|  _|  | | | | |  _|  _| | |   |
 |____/|___|_|_|___|___|_|    |_|_|_|_|_| |_| |_|_|_|_|                                                                                                                                                                  
-------------------------------------------------------- 
--------------------------------------------------------             
         _____           _                 
        |   __|_____ ___| |___ _ _ ___ ___ 
        |   __|     | . | | . | | | -_| -_|
        |_____|_|_|_|  _|_|___|_  |___|___|
                    |_|       |___|                                                                                      
             _____                                   _   
            |     |___ ___ ___ ___ ___ _____ ___ ___| |_ 
            | | | | .'|   | .'| . | -_|     | -_|   |  _|
            |_|_|_|__,|_|_|__,|_  |___|_|_|_|___|_|_|_|  
                              |___|                                                                
         _____         _             
        |   __|_ _ ___| |_ ___ _____ 
        |__   | | |_ -|  _| -_|     |
        |_____|_  |___|_| |___|_|_|_|
              |___|                  
`);

    inquirer
    .prompt({
    name:"EMS",
    type:"list",
    message:"What would you like to do?",
    choices:["View all employees","View all employees by Department","Add Employee","Remove employee","Update employee role"]
    })
    .then((answer) => {      
        switch(answer.EMS){
            case 'View all employees':
                allEmployees();
                break;
            case 'View all employees by Department':
                allEmpByDep();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            // case 'Update employee Role':
            //     updateEmpRole();
            //     break;
            // case 'Update employee Manager':
            //     updateEmpManager();
            //     break;
            // case 'View all roles':
            //     allRoles();
            //     break;
            // case 'View all roles by Department':
            //     allRolesByDep();
            //     break;
            // case 'Add Role':
            //     addRole();
            //     break;
            // case 'Remove Role':
            //     removeRole();
            //     break;
            // case 'View all Departments':
            //     allDep();
            //     break;
            // case 'Add Department':
            //     addDep();
            //     break;
            // case 'Remove Department':
            //     removeDep();
            //     break;
            // case 'Total utilized Budget by Department':
            //     budgetByDep();
            //     break;
        }
    })
}
var allEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

var allEmpByDep = () => {
    connection.query("SELECT employee_id,first_name,last_name,title,department_name,salary FROM company_role INNER JOIN employee ON company_role.role_id=employee.role_id INNER JOIN department ON company_role.department_id=department.department_id ORDER BY department_name", 
        (err,res) => {
            if(err) throw err;
            console.table(res);
            connection.end()
        }
    )
}

var addEmployee = () => {
    inquirer
      .prompt([
        {
            name:"firstName",
            type:"input",
            message:"What is employee's first name?",
        },
        {
            name:"lastName",
            type:"input",
            message:"What is employee's last name?",
        },
        {
            name:"title",
            type:"list",
            message:"Please select what title is this employee going to have",
            choices:["Accountant","Assistant to the Regional Manager","Sales person","QA-Specialist","Receptionist","Customer Serice","HR-Director","Regional Manager","Warehouse Manager","Warehouse employee"]
        }
      ])
      .then((answer) => {
          connection.query(`INSERT INTO employee (first_name,last_name,role_id) VALUES(${answer.firstName},${answer.lastName},(SELECT role_id FROM company_role WHERE title=${answer.title}))`,
          (err, res) => {
              if(err) throw err;
              console.log("Your new employee added!");
          }
          )
      })
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});