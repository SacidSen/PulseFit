import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { INITIAL_EVENTS, createEventId } from './event-utils'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function Calender() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    let clickTimer : any = null;

    function renderEventContent(eventInfo : any) {
        return (
            <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
            </>
        )
    }

    function handleEvents(events : any) {
        console.log(events);
        
        setCurrentEvents(events)
    }

    function handleDateSelect(selectInfo : any) {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
        console.log('selectInfo', selectInfo);
        

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    function handleEventClick(clickInfo : any) {
        if(clickTimer) {
            const newTitle = prompt("Please edit the title for your event:", clickInfo.event.title);
            clearTimeout(clickTimer);
            clickTimer = null;

            if (newTitle) {
            clickInfo.event.setProp("title", newTitle);
            }
        }else {
            clickTimer = setTimeout(() => {
                if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
                  clickInfo.event.remove()
                }
            }, 250);
        }
    }
    return(
        <main className='max-h-fit grow mt-24'>
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="dayGridMonth" // inital looks for month
            select={handleDateSelect}
            editable={true} // edit events
            selectable={true} // dragging, clicking effect
            selectMirror={false} // effect for dragging
            dayMaxEvents={true} // show max event number (u can pass a number)
            weekends={weekendsVisible} // toggle weekends
            eventClick={handleEventClick} // delete event
            eventsSet={handleEvents} // whenever changed something on calender, this func will called
            initialEvents={INITIAL_EVENTS} // sets static data, for static data use 'events' props. 
            eventContent={renderEventContent} // if u want to customise your Event
            />
        </main>
    )
}