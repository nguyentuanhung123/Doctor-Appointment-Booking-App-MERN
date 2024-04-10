import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async(req, res) => {
    const id = req.params.id;

    try{
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id, 
            { $set:req.body }, 
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedDoctor
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update'
        })
    }
}

export const deleteDoctor = async(req, res) => {
    const id = req.params.id;

    try{
        await Doctor.findByIdAndDelete(id)

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

export const getSingleDoctor = async(req, res) => {
    const id = req.params.id;

    try{
        const doctor = await Doctor.findById(id)
            .populate("reviews")
            .select('-password');

        return res.status(200).json({
            success: true,
            message: 'Doctor found',
            data: doctor,
        })
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: 'No doctor found'
        })
    }
}

export const getAllDoctor = async(req, res) => {

    try{

        /**
         * Search doctor on Web
         */
        const { query } = req.query;
        let doctors;

        if(query){
            doctors = await Doctor.find({
                isApproved: 'approved', 
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { specialization: { $regex: query, $options: 'i' } },
                ],
            }).select('-password');
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select('-password');
        }

        return res.status(200).json({
            success: true,
            message: 'Doctors found',
            data: doctors,
        })
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: 'Not found'
        })
    }
}

