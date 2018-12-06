import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import Moment from "moment";
import SkyLight from "react-skylight";
import Button from "@material-ui/core/Button";
import Daterange from "@material-ui/icons/DateRange";
import 'moment/locale/en-gb'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(Moment);

class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], events: [] };
    this.calendarModal = React.createRef();
  }

  // Get all trainings
  getAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ trainings: responseData });
        this.createEvents();
      });
  };

  // Create events in the correct format for BigCalendar.js from the json response
  createEvents = () => {
    let trainings = this.state.trainings;
    let events = [];
    for (let i = 0; i < trainings.length; i++) {
      if (trainings[i].customer != null) {
        events[i] = {
          title: `Activity: ${trainings[i].activity}, Customer: ${trainings[i].customer.firstname} ${trainings[i].customer.lastname}`,
          start: new Date(trainings[i].date),
          end: new Date(trainings[i].date + trainings[i].duration * 60000),
          allDay: false
        };
      }
    }
    this.setState({ events: [...events] });
    this.calendarModal.current.show()
  };

  render() {
    const calendarModalStyle = {
      margin: "auto -450px",
      width: 900,
      top: "9%"
    };

    return (
      <div>
        <div className="menuButtons">
          <Button
            style={{ width: 150, marginLeft: "110%", marginBottom: "-72%" }}
            variant="contained"
            color="primary"
            onClick={() => {this.getAllTrainings()}}
          >
            <Daterange />Show calendar
          </Button>
        </div>
        <SkyLight
          dialogStyles={calendarModalStyle}
          hideOnOverlayClicked
          ref={this.calendarModal}
        ><div className="container">
          <BigCalendar
            popup
            style={{ height: 600,}}
            culture='en-GB'
            localizer={localizer}
            events={this.state.events}
            views={["month", "day", "week", "agenda"]}
          /></div>
        </SkyLight>
      </div>
    );
  }
}

export default calendar;
