import '../database.js';
import { getRandomInt } from '../data/generate-dummy-data.js';
import { Employee, Company } from '../../models/payroll-models.js';
import fs from 'fs';

let employeeData = JSON.parse(fs.readFileSync('./config/data/00-data-employee.json', 'utf8'));

async function seedEmployeeDatabase() {
  try {
    await Employee.deleteMany();
    await assignCompanyToEmployees();
    await Employee.create(employeeData);
    console.log('employee data seeded');
  } catch (err) {
    throw err;
  }
}

async function assignCompanyToEmployees() {
  try {
    let companies = await Company.find({});
    if (companies.length < 1) {
      throw new Error('the company model cannot reference an existing companies collection or there is no data. Unable to populate employees!');
    }
    for (let employee of employeeData) {
      employee.companyId = companies[getRandomInt(0, companies.length-1)]._id;
    }
  } catch (err) {
    throw err;
  }
}

seedEmployeeDatabase();
