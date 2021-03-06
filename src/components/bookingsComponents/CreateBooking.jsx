import { HeadingMain, HeadingSub, HeadingContainer } from "../../styled/main";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Card, Button } from "react-bootstrap";

export const CreateBooking = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Allows user to select a pre-defined location from the dropdown menu.
  const locationOptions = [
    { value: "cbd", label: "CBD" },
    { value: "suburbs", label: "Suburbs" },
  ];
  const [location, setLocation] = useState(null);

  const handleChangeLocation = (selectedLocation) => {
    setLocation(selectedLocation);
  }
  // Allows user to select a pre-defined service from the dropdown menu.
  const serviceOptions = [
    { value: "massage", label: "Massage" },
    { value: "physiotherapy", label: "Physiotherapy" },
  ];
  const [service, setService] = useState(null);

  const handleChangeServiceAndCost = (selectedService) => {
    setService(selectedService);
  }

  // maps through all employees and show as options in Select dropdown
  const [allPractitioners, setAllPractitioners] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/employees`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((body) => {
        const names = body.map((employee) => {
          return {
            value: `${employee.first_name} ${employee.last_name}`,
            label: `${employee.first_name} ${employee.last_name}`,
          };
        });
        setAllPractitioners(names);
      });
  }, []);

  const [practitioner, setPractitioner] = useState(null);

  const handleChangePractitioners = (selectedPractitioner) => {
    setPractitioner(selectedPractitioner);
  }

  // Currently allows users to select a pre-defined location from the dropdown menu.
  // Ultimately would like to have it pulled from employees availability
  const dateOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
  ];
  const [date, setDate] = useState(null);

  const handleChangeDate = (selectedDate) => {
    setDate(selectedDate);
  }

  const timeOptions = [
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
  ];
  const [time, setTime] = useState(null);

  const handleChangeTime = (selectedTime) => {
    setTime(selectedTime);
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            location: location.value,
            service: service.value,
            date: date.value,
            time: time.value,
          },
        }),
      });
      props.history.push("/bookings/current");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <Row>
        <HeadingContainer>
          <HeadingMain>Make a Booking</HeadingMain>
        </HeadingContainer>
      </Row>
      <Row>
        <Card className="alignment">
          <form onSubmit={onFormSubmit}>
            <HeadingSub>Select a Location</HeadingSub>
            <Select
              options={locationOptions}
              value={location}
              onChange={handleChangeLocation}
            />
            <HeadingSub>Select a Service</HeadingSub>
            <Select
              options={serviceOptions}
              value={service}
              onChange={handleChangeServiceAndCost}
            />
            <HeadingSub>Select a Practitioner</HeadingSub>
            <Select
              options={allPractitioners}
              value={practitioner}
              onChange={handleChangePractitioners}
            />
            <HeadingSub>Select a Date</HeadingSub>
            <Select
              options={dateOptions}
              value={date}
              onChange={handleChangeDate}
            />
            <HeadingSub>Select a Time</HeadingSub>
            <Select
              options={timeOptions}
              value={time}
              onChange={handleChangeTime}
            />
            <Button variant="secondary" type="submit" value="Confirm">
              Confirm
            </Button>
          </form>
        </Card>
      </Row>
    </>
  );
};
