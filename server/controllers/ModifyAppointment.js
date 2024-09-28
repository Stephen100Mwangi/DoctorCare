import Appointment from '../models/Appointments.js';

export const markAsComplete = async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status (400).json ({message: 'Appointment ID is required'});
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate (
      id,
      {status: 'Completed'},
      {new: true}
    );

    if (!updatedAppointment) {
      return res.status (404).json ({message: 'Appointment not found'});
    }

    if (updatedAppointment.status !== 'Completed') {
      return res
        .status (400)
        .json ({message: 'Failed to mark appointment as complete'});
    }

    return res.status (200).json ({
      message: 'Appointment marked as complete successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error ('Error marking appointment as complete:', error.message);
    return res.status (500).json ({message: 'Internal Server error'});
  }
};

export const markAsCancelled = async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status (400).json ({message: 'Appointment ID is required'});
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate (
      id,
      {status: 'Cancelled'},
      {new: true}
    );

    if (!updatedAppointment) {
      return res.status (404).json ({message: 'Appointment not found'});
    }

    if (updatedAppointment.status !== 'Cancelled') {
      return res.status (400).json ({message: 'Failed to cancel appointment'});
    }

    return res.status (200).json ({
      message: 'Appointment cancelled successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error ('Error cancelling appointment:', error.message);
    return res.status (500).json ({message: 'Internal Server error'});
  }
};

export const rescheduleAppointment = async (req, res) => {
  const {id} = req.params;
  const {date} = req.body;

  if (!id) {
    return res.status (400).json ({message: 'Appointment ID is required'});
  }

  if (!date) {
    return res
      .status (400)
      .json ({message: 'New appointment date is required'});
  }

  try {
    const appointment = await Appointment.findById (id);

    if (!appointment) {
      return res.status (404).json ({message: 'Appointment not found'});
    }

    if (['Cancelled', 'Completed'].includes (appointment.status)) {
      return res.status (400).json ({
        message: `Appointment is already ${appointment.status.toLowerCase ()}. You cannot reschedule it`,
      });
    }

    const newDate = new Date (date);
    const today = new Date ();

    if (newDate < today) {
      return res
        .status (400)
        .json ({message: 'Appointments cannot be rescheduled to the past'});
    }

    const conflictingAppointment = await Appointment.findOne ({
      appointmentDate: newDate,
      doctor: appointment.doctor,
      _id: {$ne: id},
    });

    if (conflictingAppointment) {
      return res.status (400).json ({
        message: 'Another appointment is scheduled for this day and time. Please consider adjusting your time',
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate (
      id,
      {
        status: 'Rescheduled',
        appointmentDate: newDate,
      },
      {new: true}
    );

    if (!updatedAppointment) {
      return res
        .status (400)
        .json ({message: 'Failed to reschedule appointment'});
    }

    return res.status (200).json ({
      message: 'Appointment rescheduled successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error ('Error rescheduling appointment:', error.message);
    return res.status (500).json ({message: 'Internal Server error'});
  }
};
