import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
	companyName: String,
},
	{ timestamps: true }
);

const employeeSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	country: { type: String },
	salary: { type: Number },
	department: { type: String },
	position: { type: String },
	bonus: { type: Number, default: 0},
	start_date: { type: Date },
	end_date: { type: Date },
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
},
	{ timestamps: true });

const userSchema = mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null},
  companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null},
  userRoleId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserRole', default: null}
},
	{ timestamps: true });

const userRoleSchema = mongoose.Schema({
  role: { type: String,
          enum: ['Employee', 'Admin', 'Manager'] },
});

const Company = mongoose.model('Company', companySchema);
const Employee = mongoose.model('Employee', employeeSchema);
const User = mongoose.model('User', userSchema);
const UserRole = mongoose.model('UserRole', userRoleSchema);
export { Company, Employee, User, UserRole }
