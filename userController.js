const userModel = require("../model/User");

exports.getUser = async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.postUser = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
    try {
        const newUser = new userModel({ name, email, password, phoneNumber, address  });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("error in posting");
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const deleted = await userModel.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(204).json({ message: "Record deleted" })
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phoneNumber, address } = req.body;

        const updated = await userModel.findByIdAndUpdate(
            id, { name, email, password, phoneNumber, address }, { new: true }
        )
        if (!updated) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(updated)
    } catch (error) {
        console.error("error in posting");
        res.status(500).json({ error: 'Server error' });
    }
}