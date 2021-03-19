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

const start = () => {
    inquirer
    .prompt({
    name:"EMS",
    type:"list",
    message:"What would you like to do?",
    choices:["View all employees","View all employees by Department","Add Employee","View all Departments","View all Roles","Add Department","Add Role","Exit"]
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
            case 'View all Departments':
                allDepartments();
                break;
            case 'View all Roles':
                allRoles();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Exit':
                process.exit();
                break;
        }
    })
}


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
start();
}
    
var allEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        //connection.end();
        start();
    });  
};

var allEmpByDep = () => {
    connection.query("SELECT employee_id,first_name,last_name,title,department_name,salary FROM company_role INNER JOIN employee ON company_role.role_id=employee.role_id INNER JOIN department ON company_role.department_id=department.department_id ORDER BY department_name", 
        (err,res) => {
            if(err) throw err;
            console.table(res);
            //connection.end();
            start();
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
          connection.query(`INSERT INTO employee (first_name,last_name,role_id) VALUES(?,?,(SELECT role_id FROM company_role WHERE title=?))`,
          [
              answer.firstName,
              answer.lastName,
              answer.title
          ],  
          (err, res) => {
                if(err) throw err;
                console.log("Your new employee added!");
                //connection.end();
                start();
            }
          )
      })
}

var allDepartments = () => {
    connection.query("SELECT department_name FROM department", (err, res) => {
        if(err) throw err;
        console.log("These are all departments we have her at Scranton branch!");
        console.table(res);
        start();
    })
}

var addDepartment = () => {
    inquirer.prompt([
        {
            name:"depName",
            type:"input",
            message:"What is the name your new department?"
        }
    ])
    .then((answer) => {
        connection.query("INSERT INTO department (department_name) VALUES(?)",
        [answer.depName],
        (err, res) => {
            if(err) throw err;
            console.log("Your department was added!");
            start();
        }
        )
    })
}

var addRole = () => {
    connection.query("SELECT department_name FROM department",(err,res)=>{
        if(err) throw err;
        inquirer
      .prompt([
          {
            name:"title",
            type:"input",
            message:"What is the name of this new role you would like to add?"          
          },
          {
            name:"salary",
            type:"input",
            message:"Select a salary for this role please"
          },
          {
            name:"depName",
            type:"list",
            message:"Please select the department you are adding this new role to!",
            choices(){
                var deptArray = [];
                res.forEach(({ department_name }) => {
                    deptArray.push(department_name);
                });
                return deptArray;
            }
          }
      ])
      .then((answers) => {
        connection.query(`INSERT INTO company_role (title, salary, department_id) VALUES(${answers.title},${answers.salary},(SELECT department_id FROM department WHERE department_name=${answers.depName}))`,
            (err,res) => {
                if(err) throw err;
                console.log("The new role was successfully added!");
                start();
            }
        )
      })
    })
    
}

var allRoles = () => {
    connection.query("SELECT title,salary FROM company_role",(err, res) => {
        if(err) throw err;
        console.log("These are all of our roles we have at Dunder Mifflin in Scranton!");
        console.table(res);
        start();
    })
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});