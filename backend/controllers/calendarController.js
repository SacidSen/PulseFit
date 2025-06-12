const CalendarEvent = require('../models/Calendar');




// Kullanıcının tüm calendar eventlerini getir
exports.getUserCalendarEvents = async (req, res) => {
  try {
    const { userId, workoutId } = req.query;

    // Hangi parametreyi zorunlu tutmak istiyorsan kontrol et
    if (!userId && !workoutId) {
      return res.status(400).json({ message: 'userId veya workoutId gerekli' });
    }

    // Dinamik filtre oluştur
    const filter = {};
    if (userId) filter.userId = userId;
    if (workoutId) filter.workoutId = workoutId;

    const events = await CalendarEvent.find(filter).populate('workoutId');
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eventler alınamadı' });
  }
};

// Event silme
exports.deleteCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await CalendarEvent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event silindi' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Silme başarısız' });
  }
};
