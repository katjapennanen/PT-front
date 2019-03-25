import React, { Component } from "react";
import ReactTable from "react-table";
import Iconbutton from "@material-ui/core/IconButton";
import Moment from "moment";
import ListAlt from "@material-ui/icons/ListAlt";
import Tooltip from "@material-ui/core/Tooltip";
import SkyLight from "react-skylight";

class IndividualTrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = { individualTrainings: [] };
    this.individualTrainingsModal = React.createRef();
  }

  // Get individual trainings
  getTrainings = link => {
    fetch(link)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          individualTrainings: responseData.content
        });
      });
    this.individualTrainingsModal.current.show();
  };

  render() {
    const individualTrainingColumns = [
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("DD.MM.YYYY, hh:mm a")
      },
      {
        Header: "Duration",
        maxWidth: 80,
        accessor: "duration"
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
        <Tooltip title="Show trainings for this customer">
          <Iconbutton
            color="primary"
            size="small"
            style={{ height: 12, width: 12 }}
            onClick={() => this.getTrainings(this.props.customerTrainingUrl)}
          >
            <ListAlt fontSize="small" />
          </Iconbutton>
        </Tooltip>
        <SkyLight
          dialogStyles={trainingModalStyle}
          hideOnOverlayClicked
          ref={this.individualTrainingsModal}
        >
          <div className="container">
            <h3>Individual training appointments</h3>
            <ReactTable
              filterable={true}
              defaultPageSize={7}
              className="-striped -highlight"
              data={this.state.individualTrainings}
              columns={individualTrainingColumns}
            />
          </div>
        </SkyLight>
      </div>
    );
  }
}

export default IndividualTrainingList;
