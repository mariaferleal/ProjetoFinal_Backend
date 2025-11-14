import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema({
	timezone: String,
	language: String,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: PreferencesSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', UserSchema);

export class User {
  static async create(data) {
    return await UserModel.create(data);
  }

  static async getAll() {
    return await UserModel.find({});
  }

  static async getById(id) {
    return await UserModel.findById(id);
  }

  static async update(id, data) {
    data.updatedAt = new Date();
    return await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  static async remove(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  static async findByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

export default User;
