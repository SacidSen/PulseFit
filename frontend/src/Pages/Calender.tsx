import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './event-utils';
import './tooltip.css';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutPlan {
  _id: string;
  name: string;
  trainingTime?: number;
  exercises: Exercise[];
  [key: string]: any;
}

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Login olan kullanıcıyı localStorage'dan çek
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id) return; // Kullanıcı login değilse, devam etme

    // Sadece login olan kullanıcıya ait workoutları çek
    fetch(`http://localhost:8000/api/workoutP/list?userId=${user._id}`)
      .then((res) => res.json())
      .then((data) => setWorkoutPlans(data))
      .catch((err) => console.error(err));
  }, []);

  function renderEventContent(eventInfo: any) {
    return (
      <div
        className="text-xl font-bold text-center w-full cursor-pointer uppercase"
        onMouseEnter={(e) => handleTooltipOpen(e, eventInfo.event.title)}
        onMouseMove={(e) => handleTooltipMove(e)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {eventInfo.event.title}
      </div>
    );
  }

  function handleTooltipOpen(e: any, title: string) {
    const workout = workoutPlans.find((w) => w.name === title);
    if (workout) {
      const content = `
        <div>
          <h1 style="font-weight:bold; margin-bottom: 4px;">${workout.name}</h1>
          ${workout.exercises
            .map(
              (ex) =>
                `<div style="margin-bottom:2px;">${ex.name} - ${ex.sets}x${ex.reps}</div>`
            )
            .join('')}
        </div>
      `;
      setTooltipContent(content);
      setShowTooltip(true);
    }
  }

  function handleTooltipMove(e: any) {
    setTooltipPosition({ x: e.pageX + 10, y: e.pageY + 10 });
  }

  function handleEvents(events: any) {
    setCurrentEvents(events);
  }

  function handleDateSelect(selectInfo: any) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    // Kullanılmamış workout'ları al
    const usedWorkoutNames = currentEvents.map((evt) => evt.title);
    const availableWorkoutPlans = workoutPlans.filter(
      (wp) => !usedWorkoutNames.includes(wp.name)
    );

    const selectedName = prompt(
      'Lütfen eklemek istediğiniz workout planın adını seçin:\n' +
        availableWorkoutPlans.map((w) => w.name).join('\n')
    );

    if (!selectedName) return alert('Seçim yapılmadı.');

    const selectedWorkout = availableWorkoutPlans.find((w) => w.name === selectedName);
    if (!selectedWorkout) return alert('Workout bulunamadı');

    const startDate = new Date(selectInfo.startStr);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const eventList = [
      {
        id: createEventId(),
        title: selectedWorkout.name,
        start: startDate,
        end: endDate,
        allDay: false,
      },
    ];

    if (
      selectedWorkout.trainingTime &&
      selectedWorkout.trainingTime > 1 &&
      selectedWorkout.trainingTime < 2
    ) {
      const secondSlotStart = new Date(endDate);
      const secondSlotEnd = new Date(secondSlotStart);
      secondSlotEnd.setHours(secondSlotStart.getHours() + 1);

      eventList.push({
        id: createEventId(),
        title: selectedWorkout.name,
        start: secondSlotStart,
        end: secondSlotEnd,
        allDay: false,
      });
    }

    for (const evt of eventList) {
      calendarApi.addEvent(evt);
    }

    // Eklenen workout'ı listeden çıkar
    setWorkoutPlans((prev) => prev.filter((w) => w.name !== selectedWorkout.name));
  }

  function handleEventClick(clickInfo: any) {
    if (confirm(`Bu etkinliği silmek istediğinize emin misiniz? '${clickInfo.event.title}'`)) {
      // Silinen workout'u tekrar eklenebilir hale getir
      setWorkoutPlans((prev) => [
        ...prev,
        { name: clickInfo.event.title, exercises: [], _id: '', trainingTime: undefined },
      ]);
      clickInfo.event.remove();
      // Silme işleminden sonra tekrar workout ekleme arayüzünü göster
      setTimeout(() => {
        // Takvimde bir gün seçilmemiş olsa bile, kullanıcıya prompt göster
        // Kullanıcıdan bir gün seçmesini isteyebiliriz veya otomatik olarak handleDateSelect'i tetikleyemeyiz
        // Bu yüzden burada sadece prompt'u tekrar göstereceğiz
        const usedWorkoutNames = currentEvents.map((evt) => evt.title).filter((name) => name !== clickInfo.event.title);
        const availableWorkoutPlans = [
          ...workoutPlans,
          { name: clickInfo.event.title, exercises: [], _id: '', trainingTime: undefined },
        ].filter((wp) => !usedWorkoutNames.includes(wp.name));
        const selectedName = prompt(
          'Lütfen eklemek istediğiniz workout planın adını seçin:\n' +
            availableWorkoutPlans.map((w) => w.name).join('\n')
        );
        // Burada otomatik ekleme yapılmaz, sadece prompt gösterilir
      }, 0);
    }
  }

  return (
    <main className="w-full h-screen grow mt-24 relative">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView="timeGridWeek"
        allDaySlot={false}
        slotDuration="01:00:00"
        height="100%"
        expandRows={true}
        slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
        slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: false }}
        dayHeaderFormat={{ weekday: 'long' }}
        slotLabelClassNames="text-gray-400 text-lg"
        dayCellClassNames="bg-white border border-gray-200"
        select={handleDateSelect}
        editable={false} // Sürükleyerek taşıma devre dışı
        selectable={true}
        selectMirror={false}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        events={[]}
        eventContent={renderEventContent}
        eventClassNames="bg-blue-500 bg-opacity-60 text-white border border-blue-400"
      />

      {showTooltip && (
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            pointerEvents: 'none',
            zIndex: 1000,
          }}
          dangerouslySetInnerHTML={{ __html: tooltipContent }}
        />
      )}
    </main>
  );
}
