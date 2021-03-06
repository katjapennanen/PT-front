import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SkyLight from "react-skylight";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
    this.addCustomerModal = React.createRef();
  }

  // Get input values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save customer
  saveCustomer = event => {
    event.preventDefault();
    const customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.saveCustomer(customer);
    this.setState({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
    this.addCustomerModal.current.hide();
  };

  render() {
    const newCustomerModalStyle = {
      margin: "auto -250px",
      width: 500,
      top: "9%"
    };

    return (
      <div>
        <div className="menuButtons">
          <Button
            style={{ width: 150, marginBottom: "-5%" }}
            variant="contained"
            color="primary"
            onClick={() => this.addCustomerModal.current.show()}
          >
            <AddIcon />New customer
          </Button>
        </div>
        <SkyLight
          dialogStyles={newCustomerModalStyle}
          hideOnOverlayClicked
          ref={this.addCustomerModal}
          title="Add a new customer"
        >
          <form onSubmit={this.saveCustomer}>
            <TextField
              required={true}
              style={{ margin: 5 }}
              label="First name"
              name="firstname"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.firstname}
            />
            <TextField
              required={true}
              style={{ margin: 5 }}
              label="Last name"
              name="lastname"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.lastname}
            />
            <TextField
              required={true}
              style={{ margin: 5 }}
              label="Street address"
              name="streetaddress"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.streetaddress}
            />
            <TextField
              required={true}
              style={{ margin: 5 }}
              label="Postal code"
              name="postcode"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.postcode}
            />
            <TextField
              required={true}
              style={{ margin: 5 }}
              label="City"
              name="city"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <TextField
              required={true}
              type="email"
              style={{ margin: 5 }}
              label="Email address"
              name="email"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextField
              required={true}
              style={{ margin: 5 }}
              label="Phone number"
              name="phone"
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.phone}
            />
            <Button
              type="submit"
              style={{ margin: 5, height: 53, width: 95 }}
              variant="contained"
              color="primary"
            >
              <SaveIcon />Save
            </Button>
            <Button
                onClick={() => this.addCustomerModal.current.hide()}
                style={{ margin: 3, height: 53, width: 95 }}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddCustomer;
