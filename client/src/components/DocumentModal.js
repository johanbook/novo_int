import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { addDocument } from "../actions/documentActions";
import PropTypes from "prop-types";

class DocumentModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  /*  Event paramater onChange, setting name to value. Doing this can ensure e.target.value can be used in a diff name rather than making multiple onChange for every paramater, name, lastname, date, etc..*/
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newDocument = {
      name: this.state.name,
    };
    // Add Item Via addItem Action:
    this.props.addDocument(newDocument);

    //Close Modal:
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.toggle}>
            Add Document
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please login to access the documents</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Document List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Document</Label>
                <Input name="name" id="item" placeholder="Document name" onChange={this.onChange} />

                <Label for="type">Choose a type:</Label>

                <Input type="select" name="type" id="type">
                  <option value="CV">CV</option>
                  <option value="Resume">Resume</option>
                  <option value="Cover Letter">Cover Letter</option>
                </Input>

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Document
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  document: state.document,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addDocument: addDocument })(DocumentModal);
