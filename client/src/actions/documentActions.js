import { GET_DOCUMENTS, ADD_DOCUMENT, DELETE_DOCUMENT, DOCUMENTS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { axiosAnstance} from "../axios";

export const getDocuments = () => dispatch => {
  dispatch(setDocumentsLoading());
  axiosAnstance
    .get("/api/documents")
    .then(res => dispatch({
      type: GET_DOCUMENTS,
      payload: res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const addDocument = (document) => (dispatch, getState) => {
  axiosAnstance.post("/api/documents", document, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_DOCUMENT,
      payload: res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

};

export const deleteDocument = (id) => (dispatch, getState) => {
  axiosAnstance.delete(`/api/documents/${id}`, tokenConfig(getState))
    .then(res => dispatch({
      type: DELETE_DOCUMENT,
      payload: id
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

// Loading Animation:
export const setDocumentsLoading = () => {
  return {
    type: DOCUMENTS_LOADING
  };
};