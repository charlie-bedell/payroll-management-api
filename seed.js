import { seedCompanyDatabase } from './config/seed/00-seed-company.js';
import { seedEmployeeDatabase } from './config/seed/00-seed-employees.js';
import { main as generateData } from './config/data/generate-dummy-data.js';

generateData(60, 2); // generateData(num_employees, num_companies);
seedCompanyDatabase().then(() => seedEmployeeDatabase());

