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
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Firstname",
        accessor: "customer.firstname",
        maxWidth: 150
      },
      {
        Header: "Lastname",
        accessor: "customer.lastname",
        maxWidth: 150
      },
      {
        Header: "Date and time",
        accessor: "date",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => Moment(value).format("DD.MM.YYYY, hh:mm a")
      },
      {
        Header: "Duration (min)",
        accessor: "duration",
        maxWidth: 120
      },
      {
        Header: "",
        accessor: "id",
        maxWidth: 40,
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Tooltip title="Delete this training">
            <Iconbutton
              color="secondary"
              size="small"
              style={{ height: 12, width: 12 }}
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
      width: 900,
      height: "80%",
      top: "9%"
    };

    return (
      <div>
        <div className="menuButtons">
          <Button
            style={{ width: 150, marginLeft: "220%", marginBottom: "-44%" }}
            variant="contained"
            color="primary"
            onClick={this.getAllTrainings}
          >
            <ListIcon />
            Show all trainings
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
              defaultPageSize={13}
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
