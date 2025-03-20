import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Clock, Edit, Phone, X } from "lucide-react";

interface Appointment {
  id: string;
  customerName: string;
  appointmentType: string;
  date: string;
  time: string;
  phone: string;
}

interface UpcomingAppointmentsProps {
  appointments?: Appointment[];
  title?: string;
}

const UpcomingAppointments = ({
  appointments = [
    {
      id: "1",
      customerName: "Emma Johnson",
      appointmentType: "Custom Ring Design",
      date: "2023-06-15",
      time: "10:00 AM",
      phone: "(555) 123-4567",
    },
    {
      id: "2",
      customerName: "Michael Chen",
      appointmentType: "Watch Repair",
      date: "2023-06-15",
      time: "1:30 PM",
      phone: "(555) 987-6543",
    },
    {
      id: "3",
      customerName: "Sophia Rodriguez",
      appointmentType: "Jewelry Appraisal",
      date: "2023-06-16",
      time: "11:15 AM",
      phone: "(555) 456-7890",
    },
    {
      id: "4",
      customerName: "James Wilson",
      appointmentType: "Engagement Ring Consultation",
      date: "2023-06-16",
      time: "3:00 PM",
      phone: "(555) 234-5678",
    },
  ],
  title = "Upcoming Appointments",
}: UpcomingAppointmentsProps) => {
  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 rounded-lg border border-gray-100 bg-gray-50 flex justify-between items-start"
              >
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">
                    {appointment.customerName}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {appointment.appointmentType}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span className="mr-3">{formatDate(appointment.date)}</span>
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Phone className="h-3.5 w-3.5 mr-1" />
                    <span>{appointment.phone}</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>No upcoming appointments</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button variant="outline" size="sm" className="text-xs">
            View All Appointments
          </Button>
          <Button size="sm" className="text-xs">
            + New Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
