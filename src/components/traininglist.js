import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Iconbutton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import Snackbar from "@material-ui/core/Snackbar";
import Moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import SkyLight from "react-skylight";

class Traininglist extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], showDeleteSnack: false };
    this.showAllTrainingsModal = React.createRef();
  }

  // Get all trainings
  getAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ trainings: responseData });
      });
    this.showAllTrainingsModal.current.show();
  };

  // Delete a training
  deleteTraining = id => {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
      method: "DELETE"
    }).then(response => {
      this.getAllTrainings();
      this.setState({ showDeleteSnack: true });
    });
  };

  handleClose = () => {
    this.setState({
      showDeleteSnack: false
    });
  };

  render() {
    const trainingColumns = [
      {
        Header: "Firstname",
        accessor: "customer.firstname"
      }, {
        Header: "Lastname",
        accessor: "customer.lastname"
      }, {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("DD.MM.YYYY, hh:mm a")
      }, {
        Header: "Duration (min)",
        accessor: "duration",
        maxWidth: 120
      }, {
        Header: "Activity",
        accessor: "activity"
      }, {
        Header: "",
        accessor: "id",
        maxWidth: 80,
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Tooltip title="Delete this training">
            <Iconbutton
              color="secondary"
              size="small"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this training permanently?"
                  )
                )
                  this.deleteTraining(value);
              }}
              aria-label="Delete"
            >
              <DeleteIcon fontSize="small" />
            </Iconbutton>
          </Tooltip>
        )
      }
    ];

    const trainingModalStyle = {
      margin: "auto -450px",
      width: "900px",
      top: "10%"
    };

    return (
      <div>
        <div className="menuButtons">
          <Button
            style={{ width: "150px", marginLeft: "220%", marginBottom: "-44%" }}
            variant="contained"
            color="primary"
            onClick={this.getAllTrainings}
          >
            <ListIcon />Show all trainings
          </Button>
        </div>
        <SkyLight
          dialogStyles={trainingModalStyle}
          hideOnOverlayClicked
          ref={this.showAllTrainingsModal}
        >
          <div className="container">
            <h3>All training sessions</h3>
            <ReactTable
              filterable={true}
              defaultPageSize={10}
              className="-striped -highlight"
              data={this.state.trainings}
              columns={trainingColumns}
            />
          </div>
        </SkyLight>
        <Snackbar
          message={"Training deleted succesfully!"}
          open={this.state.showDeleteSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Traininglist;
