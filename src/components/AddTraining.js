import React, { Component } from "react";
import SkyLight from "react-skylight";
import DateTimePicker from "react-datetime-picker";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Iconbutton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      activity: "",
      duration: ""
    };
    this.newTrainingModal = React.createRef();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Get date and time input
  handleDateTimeChange = date => this.setState({ date });

  // Save a new training
  saveTraining = event => {
    event.preventDefault();
    const training = {
      date: this.state.date,
      activity: this.state.activity,
      duration: this.state.duration,
      customer: this.props.customer
    };
    this.props.saveTraining(training);
    this.setState({
      date: "",
      activity: "",
      duration: ""
    });
    this.newTrainingModal.current.hide();
  };

  render() {
      
    const newTrainingModalStyle = {
      width: 400,
      margin: "auto -200px",
      top: "9%"
    };

    return (
      <div>
        <Tooltip title="Add new training">
          <Iconbutton
            size="small"
            color="primary"
            style={{ height: 12, width: 12 }}
            onClick={() => this.newTrainingModal.current.show()}
          >
            <AddIcon fontSize="small" />
          </Iconbutton>
        </Tooltip>
        <SkyLight
          dialogStyles={newTrainingModalStyle}
          hideOnOverlayClicked
          ref={this.newTrainingModal}
          title="Add new training appointment"
        >
          <form onSubmit={this.saveTraining}>
            <div id="newTrainingInputs">
              <TextField
                required={true}
                style={{ margin: 5 }}
                label="Activity"
                name="activity"
                variant="outlined"
                onChange={this.handleChange}
                value={this.state.activity}
              />
              <br />
              <TextField
                required={true}
                style={{ margin: 5 }}
                label="Duration (in minutes)"
                name="duration"
                variant="outlined"
                onChange={this.handleChange}
                value={this.state.duration}
              />
              <p>Pick date and time</p>
              <DateTimePicker
                locale="en-GB"
                showLeadingZeros={true}
                showWeekNumbers={true}
                onChange={this.handleDateTimeChange}
                value={this.state.date}
              />
              <br />
              <Button
                type="submit"
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
              >
                <SaveIcon />
                Save
              </Button>
              <Button
                onClick={() => this.newTrainingModal.current.hide()}
                style={{ margin: 10, height: 40 }}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddTraining;
