import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import Moment from "moment";
import SkyLight from "react-skylight";
import Button from "@material-ui/core/Button";
import Daterange from "@material-ui/icons/DateRange";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(Moment);

class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], events: [] };
    this.addModal = React.createRef();
  }

  componentDidMount() {
    this.listAllTrainings();
  }

  // Get all trainings
  listAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ trainings: responseData });
      });
  };

  // Create events in the correct format from the json response
  createEvents = () => {
    let trainings = this.state.trainings;
    let events = [];

    for (let i = 0; i < trainings.length; i++) {
      if (trainings[i].customer != null) {
        events[i] = {
          title: `Activity: ${trainings[i].activity}, Customer: ${
            trainings[i].customer.firstname
          } ${trainings[i].customer.lastname}`,
          start: new Date(trainings[i].date),
          end: new Date(trainings[i].date + trainings[i].duration * 60000),
          allDay: false
        };
      }
    }
    this.setState({ events: events });
    this.addModal.current.show();
  };

  render() {
    const calendarModalStyle = {
      marginTop: "-400px",
      minWidth: "800px"
    };
    return (
      <div>
        <div className="buttonTest">
          <Button
            style={{ width: "150px" }}
            variant="contained"
            color="primary"
            onClick={this.createEvents}
          >
            <Daterange />
            Show calendar
          </Button>
        </div>
        <SkyLight
          dialogStyles={calendarModalStyle}
          hideOnOverlayClicked
          ref={this.addModal}
        >
          <div className="container">
            <BigCalendar
              popup
              localizer={localizer}
              style={{ height: 700 }}
              events={this.state.events}
              views={["month", "day", "week", "agenda"]}
            />
          </div>
        </SkyLight>
      </div>
    );
  }
}

export default calendar;
