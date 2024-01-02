import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
	companyName: String,
},
	{ timestamps: true }
);

const employeeSchema = mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	country: { type: String },
	salary: { type: Number },
	department: { type: String },
	position: { type: String },
	bonus: { type: Number },
	start_date: { type: Date },
	end_date: { type: Date },
	company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
},
	{ timestamps: true });

let Company = mongoose.model('Company', companySchema);
let Employee = mongoose.model('Employee', employeeSchema);

export { Company, Employee }
