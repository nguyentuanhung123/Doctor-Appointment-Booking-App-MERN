import User from "../models/UserSchema.js";

export const updateUser = async(req, res) => {
    const id = req.params.id;

    try{
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set:req.body }, 
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedUser
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const deleteUser = async(req, res) => {
    const id = req.params.id;

    try{
        await User.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const getSingleUser = async(req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findById(id).select('-password');

        return res.status(200).json({
            success: true,
            message: 'User found',
            data: user,
        })
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: 'No user found'
        })
    }
}

export const getAllUser = async(req, res) => {

    try{
        const users = await User.find({}).select('-password');

        return res.status(200).json({
            success: true,
            message: 'Users found',
            data: users,
        })
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
}

