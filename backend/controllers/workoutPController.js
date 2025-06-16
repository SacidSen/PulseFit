const Workout = require('../models/workoutP');
const CalendarEvent = require('../models/Calendar'); // CalendarEvent modelini import et

// Create Workout
exports.createWorkout = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'Kullanıcı ID gerekli' });
    }

    const { name } = req.body;

    // Küçük büyük harf duyarsız kontrol
    const existingWorkout = await Workout.findOne({
      user: userId,
      name: { $regex: new RegExp('^' + name + '$', 'i') }
    });

    if (existingWorkout) {
      return res.status(400).json({ message: 'Bu isimde bir workout zaten var!' });
    }

    const workoutData = {
      ...req.body,
      user: userId
    };

    const workout = new Workout(workoutData);
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout oluşturulamadı' });
  }
};


// Delete Workout
exports.deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Workout bulunamadı' });
    }

    // Workout silindiyse, ilgili tüm calendar kayıtlarını da sil
    await CalendarEvent.deleteMany({ workoutId: req.params.id });

    res.status(200).json({ message: 'Workout ve ilgili calendar eventler silindi' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout silinemedi' });
  }
};

// update Workout
exports.updateWorkout = async (req, res) => {
  const workoutId = req.params.id;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout bulunamadı' });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout güncellenemedi' });
  }
};
// Get All Workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const userId = req.query.userId;

    const filter = {};
    if (userId) {
      filter.user = userId;
    }

    const workouts = await Workout.find(filter).populate('exercises');
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workoutlar alınamadı' });
  }
};