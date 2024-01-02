import '../database.js';
import { getRandomInt } from '../data/generate-dummy-data.js';
import { Company, Employee } from '../../models/payroll-models.js';
import fs from 'fs';



async function seedEmployeeDatabase() {
  let employeeData = JSON.parse(fs.readFileSync('./config/data/00-data-employee.json', 'utf8'));
  try {
    await Employee.deleteMany();
    employeeData = await assignCompanyToEmployees(employeeData);
    await Employee.create(employeeData);
    console.log('employee data seeded');
  } catch (err) {
    throw err;
  }
}

async function assignCompanyToEmployees(employeeData) {
  try {
    let companies = await Company.find({});
    if (companies.length < 1) {
      throw new Error('the company model cannot reference an existing companies collection or there is no data. Unable to populate employees!');
    }
    for (let employee of employeeData) {
      employee.companyId = companies[getRandomInt(0, companies.length-1)]._id;
    }
    return employeeData;
  } catch (err) {
    throw err;
  }
}

export { seedEmployeeDatabase };
