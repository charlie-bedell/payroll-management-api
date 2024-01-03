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
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
},
	{ timestamps: true });

let userSchema = mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true }
},
	{ timestamps: true });

const Company = mongoose.model('Company', companySchema);
const Employee = mongoose.model('Employee', employeeSchema);
const User = mongoose.model('User', userSchema);

export { Company, Employee, User }
