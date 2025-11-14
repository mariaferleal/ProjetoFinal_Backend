import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  status: { type: String, default: 'pending' },
  priority: { type: String, default: 'normal' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model('Task', TaskSchema);

export class Task {
  static async create(data) {
    return await TaskModel.create(data);
  }
  static async getAll() {
    return await TaskModel.find({});
  }
  static async getById(id) {
    return await TaskModel.findById(id);
  }
  static async update(id, data) {
    data.updatedAt = new Date();
    return await TaskModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }
  static async remove(id) {
    return await TaskModel.findByIdAndDelete(id);
  }
}

export default Task;
