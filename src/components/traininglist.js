import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";
import Snackbar from "@material-ui/core/Snackbar";
import Moment from "moment";
import SkyLight from "react-skylight";

class Traininglist extends Component {
  constructor(params) {
    super(params);
    this.state = { alltrainings: [], showSnack: false };
    this.addModal = React.createRef();
  }

  // Get all trainings
  listAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ alltrainings: responseData });
      });
    this.addModal.current.show();
  };

  // Delete a training
  deleteTraining = link => {
    fetch("https://customerrest.herokuapp.com/api/trainings/" + link, {
      method: "DELETE"
    }).then(response => {
      this.listAllTrainings();
      this.setState({ showSnack: true });
    });
  };

  handleClose = () => {
    this.setState({
      showSnack: false
    });
  };

  render() {
    const trainingColumns = [
      {
        Header: "Firstname",
        accessor: "customer.firstname"
      },
      {
        Header: "Lastname",
        accessor: "customer.lastname"
      },
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("MMM Do YYYY, h:mm a")
      },
      {
        Header: "Duration (in minutes)",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "",
        accessor: "id",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Button
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
          </Button>
        )
      }
    ];

    const trainingModalStyle = {
      marginTop: "-300px"
    };

    return (
      <div>
        <Button
          style={{ position: "relative", top: "40px", left: "100px" }}
          variant="contained"
          color="secondary"
          onClick={this.listAllTrainings}
        >
          <ListIcon /> Show all trainings
        </Button>
        <SkyLight
          dialogStyles={trainingModalStyle}
          hideOnOverlayClicked
          ref={this.addModal}
        >
          <h3>All trainings</h3>
          <ReactTable
            filterable={true}
            defaultPageSize={10}
            className="-striped -highlight"
            data={this.state.alltrainings}
            columns={trainingColumns}
          />
        </SkyLight>
        <Snackbar
          message={"Training deleted"}
          open={this.state.showSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Traininglist;
