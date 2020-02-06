import React from 'react';
import {connect} from 'react-redux';
import { 
  AfterModal, BeforeModal, BetweenModal, CookieModal, HeaderModal, HostModal, MethodModal, PathModal, QueryModal, RemoteAddrModal,
  AddRequestHeaderModal, AddRequestParameterModal, AddResponseHeaderModal, FallBackHeadersModal, HystrixModal, PrefixPathModal,
  PreserveHostHeaderModal, RedirectToModal, RemoveRequestHeaderModal, RemoveResponseHeaderModal, RequestRateLimiterModal, 
  RequestSizeModal, RetryModal, RewritePathModal, RewriteResponseHeaderModal, SetPathModal, SetResponseHeaderModal, 
  SetStatusModal, StripPrefixModal, AddResourceModal, DeleteModal
} from '../../Modals';

const MODAL_COMPONENTS = {
  /* predicates modals */
  'AFTER_MODAL': AfterModal,
  'BEFORE_MODAL': BeforeModal,
  'BETWEEN_MODAL': BetweenModal,
  'COOKIE_MODAL': CookieModal,
  'HEADER_MODAL': HeaderModal,
  'HOST_MODAL': HostModal,
  'METHOD_MODAL': MethodModal,
  'PATH_MODAL': PathModal,
  'QUERY_MODAL': QueryModal,
  'REMOTEADDR_MODAL': RemoteAddrModal,
  /* filters modals */
  'ADDREQUESTHEADER_MODAL': AddRequestHeaderModal,
  'ADDREQUESTPARAMETER_MODAL': AddRequestParameterModal,
  'ADDRESPONSEHEADER_MODAL': AddResponseHeaderModal,
  'FALLBACKHEADERS_MODAL': FallBackHeadersModal,
  'HYSTRIX_MODAL': HystrixModal,
  'PREFIXPATH_MODAL': PrefixPathModal,
  'PRESERVEHOSTHEADER_MODAL': PreserveHostHeaderModal,
  'REDIRECTTO_MODAL': RedirectToModal,
  'REMOVEREQUESTHEADER_MODAL': RemoveRequestHeaderModal,
  'REMOVERESPONSEHEADER_MODAL': RemoveResponseHeaderModal,
  'REQUESTRATELIMITER_MODAL': RequestRateLimiterModal,
  'REQUESTSIZE_MODAL': RequestSizeModal,
  'RETRY_MODAL': RetryModal,
  'REWRITEPATH_MODAL': RewritePathModal,
  'REWRITERESPONSEHEADER_MODAL': RewriteResponseHeaderModal,
  'SETPATH_MODAL': SetPathModal,
  'SETRESPONSEHEADER_MODAL': SetResponseHeaderModal,
  'SETSTATUS_MODAL': SetStatusModal,
  'STRIPPREFIX_MODAL': StripPrefixModal,
  'ADD_RESOURCE': AddResourceModal,
  'DELETE_MODAL': DeleteModal
}

const ModalRoot = ({state}) => {
  if (!state.modalType) {
    return null
  }
  const SpecificModal = MODAL_COMPONENTS[state.modalType]
  return <SpecificModal {...state.modalProps} />
}

const mapStateToProps = (state) => {
    return {
        state: state.modal
    }
}
export default connect(mapStateToProps)(ModalRoot);