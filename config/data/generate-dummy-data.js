import fs from 'fs';
// Generates a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray(arr) {
  return arr[getRandomInt(0, arr.length-1)];
}

function randFirstName() {
  const firstNames = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eva',
    'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
    'Kate', 'Leo', 'Mia', 'Noah', 'Olivia',
    'Paul', 'Quinn', 'Ryan', 'Sara', 'Tom',
    'Uma', 'Vincent', 'Wendy', 'Xavier', 'Yara',
    'Zane', 'Anna', 'Ben', 'Chloe', 'Daniel',
    'Emily', 'Felix', 'Georgia', 'Hank', 'Isabel',
    'Jacob', 'Lily', 'Max', 'Nora', 'Oscar',
    'Penny', 'Quentin', 'Rachel', 'Sam', 'Tyler',
    'Ursula', 'Victor', 'Willa', 'Xander', 'Yasmine',
  ];
  return randomFromArray(firstNames);
}

function randLastName() {
  const lastNames = [
    'Anderson', 'Brown', 'Clark', 'Davis', 'Edwards',
    'Fisher', 'Garcia', 'Hill', 'Irwin', 'Johnson',
    'Kumar', 'Lee', 'Miller', 'Nguyen', 'Owens',
    'Patel', 'Quinn', 'Reed', 'Smith', 'Taylor',
    'Upton', 'Vargas', 'Williams', 'Xiong', 'Yates',
    'Zhang', 'Baker', 'Cooper', 'Diaz', 'Evans',
    'Fleming', 'Gomez', 'Harrison', 'Ingram', 'Jackson',
    'Klein', 'Lopez', 'Martinez', 'Nelson', 'Olsen',
    'Perez', 'Quintero', 'Robinson', 'Silva', 'Thomas',
    'Underwood', 'Vega', 'Watson', 'Xu', 'Young',
  ];
  return randomFromArray(lastNames);
}

function randCountry() {
  const countries = [
    'Argentina', 'Brazil', 'Canada', 'Denmark', 'Egypt',
    'France', 'Germany', 'India', 'Japan', 'Kenya',
    'Lebanon', 'Mexico', 'Netherlands', 'Oman', 'Portugal',
    'Qatar', 'Russia', 'Spain', 'Turkey', 'United States',
  ];
  return randomFromArray(countries);
}

function randDepartment() {
  const departments = [
    'Marketing', 'Finance',
    'Information Technology',
    'Human Resources',
    'Research and Development',
  ];
  return randomFromArray(departments);
}

function randPosition() {
  const positions = [
    'CEO', 'CFO', 'CTO', 'Software Engineer', 'Marketing Manager',
    'Human Resources Specialist', 'Sales Representative', 'Product Manager', 'Graphic Designer', 'Data Analyst',
    'Customer Support Specialist', 'Operations Manager', 'Quality Assurance Engineer', 'Project Manager', 'Research and Development Scientist',
    'Financial Analyst', 'Administrative Assistant', 'Business Development Manager', 'UX/UI Designer', 'IT Administrator',
  ];
  return randomFromArray(positions);
}

function randSalary() {
  const salaries = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 140, 150];
  return randomFromArray(salaries) * 1000;
}

function randBonus() {
  const bonuses = [1,2,3,4,5,6,7,8,9,10,12,14,16,18,20];
  return randomFromArray(bonuses) * 1000;
}

function getRandomStartDate(startDate, endDate) {
  // Calculate the difference in milliseconds between the end and start dates
  const dateDifference = endDate.getTime() - startDate.getTime();
  // Generate a random number within the date difference range
  const randomTime = startDate.getTime() + Math.random() * dateDifference;
  // Create a new Date object with the random time
  const randomDate = new Date(randomTime);

  return randomDate;
}

function getRandomEndDate(startDate) {

  const firedChance = 40; // percent
  if (getRandomInt(0,100) <= firedChance) {
    const maxEndDate = new Date('2024-01-01');
    const endDate = new Date(startDate);
    let maxDelta = Math.floor((maxEndDate - startDate) / (1000 * 60 * 60 * 24));
    endDate.setDate(getRandomInt(0, maxDelta));
    return endDate;
  } else {
    return null;
  }
}

function randomEmployee() {
  const start = getRandomStartDate(new Date('2010-01-01'),
                                   new Date('2023-01-01'));
  const end = getRandomEndDate(start);

  const employee = {
	  firstName: randFirstName(),
	  lastName: randLastName(),
	  country: randCountry(),
	  salary: randSalary(),
    department: randDepartment(),
	  position: randPosition(),
	  bonus: randBonus(),
	  start_date: start,
	  end_date: end
  };
  return employee;
}

function randCompanySuffix() {
  const suffixes = ['Corporation', 'Company', '& Co.', 'Limited', ''];
  return randomFromArray(suffixes);
}

function randCompanyName() {
  const coName = ['Shelby', 'Enron', 'Sunstream', 'AIG'];
  return randomFromArray(coName);
}

function randomCompany() {
  const company = {
    companyName: [randCompanyName(), randCompanySuffix()].join(' ').trim()
  };
  return company;
};

function main() {
  const N_EMPLOYEES = 56;
  const N_COMPANIES = 2;
  const employees = [];
  const companies = [];
  for (let i = 0; i < N_EMPLOYEES; i++) {
    employees.push(randomEmployee());
  }
  for (let i = 0; i < N_COMPANIES; i++) {
    companies.push(randomCompany());
  }
  
  fs.writeFileSync('./00-data-company.json', JSON.stringify(companies));
  fs.writeFileSync('./00-data-employee.json', JSON.stringify(employees));
}

export { getRandomInt }
