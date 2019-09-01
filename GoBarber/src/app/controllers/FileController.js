import File from '../models/File';

class FileController {
  async store(req, res) {

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(File);
  }
}

export default new FileController();
