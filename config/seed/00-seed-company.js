import '../database.js';
import { Company } from '../../models/payroll-models.js';
import fs from 'fs';

let companyData = JSON.parse(fs.readFileSync('./config/data/00-data-company.json', 'utf8'));

async function seedCompanyDatabase() {
  try {
    await Company.deleteMany();
    await Company.create(companyData);
    console.log('company data seeded');
  } catch (err) {
    throw err;
  }
}

await seedCompanyDatabase();
