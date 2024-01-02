import '../database.js';
import { Company } from '../../models/payroll-models.js';
import fs from 'fs';



async function seedCompanyDatabase() {
  let companyData = JSON.parse(fs.readFileSync('./config/data/00-data-company.json', 'utf8'));
  try {
    await Company.deleteMany();
    await Company.create(companyData);
    console.log('company data seeded');
  } catch (err) {
    throw err;
  }
}

export { seedCompanyDatabase };
