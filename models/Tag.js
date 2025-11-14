import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
});

const TagModel = mongoose.model('Tag', TagSchema);

export class Tag {
  static async create(data) {
    return await TagModel.create(data);
  }
  static async getAll() {
    return await TagModel.find({});
  }
  static async getById(id) {
    return await TagModel.findById(id);
  }
  static async update(id, data) {
    return await TagModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }
  static async remove(id) {
    return await TagModel.findByIdAndDelete(id);
  }
}

export default Tag;
