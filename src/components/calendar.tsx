import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg } from '@fullcalendar/core';

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Consulta: Juan Pérez (Dr. González)',
      start: '2025-01-16T10:00:00',
      end: '2025-01-16T11:00:00',
      extendedProps: { paciente: 'Juan Pérez', profesional: 'Dr. González', consultorio: '101' },
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    paciente: '',
    profesional: '',
    consultorio: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string } | null>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // Almacena el rango seleccionado
    setSelectedRange({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setShowForm(true); // Muestra el formulario
  };

  const handleAddEvent = () => {
    if (!selectedRange) return;

    setEvents([
      ...events,
      {
        id: `${events.length + 1}`,
        title: `Consulta: ${newEvent.paciente} (${newEvent.profesional})`,
        start: selectedRange.start,
        end: selectedRange.end,
        extendedProps: {
          paciente: newEvent.paciente,
          profesional: newEvent.profesional,
          consultorio: newEvent.consultorio,
        },
      },
    ]);

    // Limpia el formulario y el rango seleccionado
    setNewEvent({ paciente: '', profesional: '', consultorio: '' });
    setSelectedRange(null);
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <div>
          <h3>Agendar turno</h3>
          <input
            type="text"
            placeholder="Paciente"
            value={newEvent.paciente}
            onChange={(e) => setNewEvent({ ...newEvent, paciente: e.target.value })}
          />
          <input
            type="text"
            placeholder="Profesional"
            value={newEvent.profesional}
            onChange={(e) => setNewEvent({ ...newEvent, profesional: e.target.value })}
          />
          <input
            type="text"
            placeholder="Consultorio"
            value={newEvent.consultorio}
            onChange={(e) => setNewEvent({ ...newEvent, consultorio: e.target.value })}
          />
          <button onClick={handleAddEvent}>Confirmar turno</button>
          <button onClick={() => setShowForm(false)}>Cancelar</button>
        </div>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true} // Habilita selección de fechas
        select={handleDateSelect} // Maneja la selección de fechas
      />
    </div>
  );
};

export default CalendarComponent;
