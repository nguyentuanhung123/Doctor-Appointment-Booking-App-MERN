import User from "../models/UserSchema.js";
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

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

export const getUserProfile = async(req, res) => {
    const userId = req.userId;

    try{
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const { password, ...rest } = user._doc

        return res.status(200).json({
            success: true,
            message: 'Profile info is getting',
            data: {...rest}
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, cannot get'
        });
    }
}

export const getMyAppointments = async(req, res) => {
    try{
        // step -1: retrieve appoinments from booking for specific user
        const bookings = await Booking.find({user: req.userId})

        // step -2: extract doctor ids from appoinment bookings
        const doctorIds = bookings.map((el) => el.doctor.id)

        // step -3: retrieve doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in: doctorIds}}).select('-password')

        return res.status(200).json({
            success: true,
            message: 'Appointments are getting',
            data: doctors
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, cannot get'
        });
    }
}

