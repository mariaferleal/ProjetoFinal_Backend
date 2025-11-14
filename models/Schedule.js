import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  isTeamSchedule: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

export class Schedule {
  static async create(data) {
    return await ScheduleModel.create(data);
  }
  static async getAll() {
    return await ScheduleModel.find({});
  }
  static async getById(id) {
    return await ScheduleModel.findById(id);
  }
  static async update(id, data) {
    data.updatedAt = new Date();
    return await ScheduleModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }
  static async remove(id) {
    return await ScheduleModel.findByIdAndDelete(id);
  }
}

export default Schedule;
