import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String }
});

const TagModel = mongoose.model('Tag', TagSchema);

export class Tag {
  static async create(data) {
    const created = await TagModel.create(data);
    return await TagModel.findById(created._id).populate('userId', 'name email');
  }
  static async getAll() {
    return await TagModel.find({}).populate('userId', 'name email');
  }
  static async getById(id) {
    return await TagModel.findById(id).populate('userId', 'name email');
  }
  static async update(id, data) {
    return await TagModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('userId', 'name email');
  }
  static async remove(id) {
    return await TagModel.findByIdAndDelete(id);
  }
}

export default Tag;
