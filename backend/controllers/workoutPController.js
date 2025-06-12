const Workout = require('../models/workoutP');



exports.createWorkout = async (req, res) => {
  try {
    const userId = req.params.id;  // URL parametresinden user id alınır
    if (!userId) {
      return res.status(400).json({ message: 'Kullanıcı ID gerekli' });
    }

    // req.body ile gelen workout verilerini al, user alanını ekle
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

exports.deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Workout bulunamadı' });
    }

    res.status(200).json({ message: 'Workout silindi' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout silinemedi' });
  }
};
exports.updateWorkout = async (req, res) => {
  const workoutId = req.params.id;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      { exercises: req.body.exercises },
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
exports.saveWorkout = async (req, res) => {
  try {
    const { user, exercises, startTime, endTime } = req.body;

    if (!user || !Array.isArray(exercises) || exercises.length === 0 || !startTime || !endTime) {
      return res.status(400).json({ error: 'Eksik veya hatalı veri var' });
    }

    const workout = new Workout({
      user,
      exercises,
      startTime,
      endTime,
    });

    await workout.save();

    res.status(201).json({ message: 'Workout kaydedildi', workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kayıt başarısız' });
  }
};

exports.getAllWorkouts = async (req, res) => {
  try {
    const { userId } = req.query;
    let filter = {};
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
