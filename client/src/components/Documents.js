import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getDocuments, deleteDocument } from "../actions/documentActions";
import PropTypes from 'prop-types';
import Spinner from "./common/Spinner";

class List extends Component {

  static propTypes = {
    getDocuments: PropTypes.func.isRequired,
    document: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getDocuments();
  }

  onDeleteClick = (id) => {
    this.props.deleteDocument(id);
  }

  render() {
    let content;

    const { documents, loading } = this.props.document;

    if(loading === true) {
      content = <Spinner />
    } else {
      content = 
      <TransitionGroup>
      {/* Iterate through the state: */}
      {documents.map(({ _id, name, type }) => (
        <CSSTransition key={_id} timeout={500} classNames="fade">
          <a href={`/${type}/${_id}`}>
          <ListGroupItem style={{ width: '100%', display: 'flex'}}>
          <div>
          <b>{type}</b>: {name}
          </div>
            { this.props.isAuthenticated ? <Button className="remove-btn margin-left-auto"
            color="danger"
            size="sm"
            onClick={this.onDeleteClick.bind(this, _id)}> &times; </Button> : null }
          </ListGroupItem>
          </a>
        </CSSTransition>
      ))}
    </TransitionGroup>
    }
    return (
      <Container>
        <ListGroup>
          {content}
        </ListGroup>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    document: state.document,
    isAuthenticated: state.auth.isAuthenticated
  })
};

export default connect(mapStateToProps, { getDocuments: getDocuments, deleteDocument: deleteDocument })(List);