/**
 * @fileoverview gRPC-Web generated client stub for iecrypto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.iecrypto = require('./msg_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.iecrypto.IecryptoClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.iecrypto.IecryptoPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.iecrypto.publikkey,
 *   !proto.iecrypto.identifier>}
 */
const methodDescriptor_Iecrypto_identifierOfKey = new grpc.web.MethodDescriptor(
  '/iecrypto.Iecrypto/identifierOfKey',
  grpc.web.MethodType.UNARY,
  proto.iecrypto.publikkey,
  proto.iecrypto.identifier,
  /**
   * @param {!proto.iecrypto.publikkey} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.iecrypto.identifier.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.iecrypto.publikkey,
 *   !proto.iecrypto.identifier>}
 */
const methodInfo_Iecrypto_identifierOfKey = new grpc.web.AbstractClientBase.MethodInfo(
  proto.iecrypto.identifier,
  /**
   * @param {!proto.iecrypto.publikkey} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.iecrypto.identifier.deserializeBinary
);


/**
 * @param {!proto.iecrypto.publikkey} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.iecrypto.identifier)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.iecrypto.identifier>|undefined}
 *     The XHR Node Readable Stream
 */
proto.iecrypto.IecryptoClient.prototype.identifierOfKey =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/iecrypto.Iecrypto/identifierOfKey',
      request,
      metadata || {},
      methodDescriptor_Iecrypto_identifierOfKey,
      callback);
};


/**
 * @param {!proto.iecrypto.publikkey} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.iecrypto.identifier>}
 *     A native promise that resolves to the response
 */
proto.iecrypto.IecryptoPromiseClient.prototype.identifierOfKey =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/iecrypto.Iecrypto/identifierOfKey',
      request,
      metadata || {},
      methodDescriptor_Iecrypto_identifierOfKey);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.iecrypto.insertModel,
 *   !proto.iecrypto.insertResult>}
 */
const methodDescriptor_Iecrypto_insert = new grpc.web.MethodDescriptor(
  '/iecrypto.Iecrypto/insert',
  grpc.web.MethodType.UNARY,
  proto.iecrypto.insertModel,
  proto.iecrypto.insertResult,
  /**
   * @param {!proto.iecrypto.insertModel} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.iecrypto.insertResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.iecrypto.insertModel,
 *   !proto.iecrypto.insertResult>}
 */
const methodInfo_Iecrypto_insert = new grpc.web.AbstractClientBase.MethodInfo(
  proto.iecrypto.insertResult,
  /**
   * @param {!proto.iecrypto.insertModel} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.iecrypto.insertResult.deserializeBinary
);


/**
 * @param {!proto.iecrypto.insertModel} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.iecrypto.insertResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.iecrypto.insertResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.iecrypto.IecryptoClient.prototype.insert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/iecrypto.Iecrypto/insert',
      request,
      metadata || {},
      methodDescriptor_Iecrypto_insert,
      callback);
};


/**
 * @param {!proto.iecrypto.insertModel} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.iecrypto.insertResult>}
 *     A native promise that resolves to the response
 */
proto.iecrypto.IecryptoPromiseClient.prototype.insert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/iecrypto.Iecrypto/insert',
      request,
      metadata || {},
      methodDescriptor_Iecrypto_insert);
};


module.exports = proto.iecrypto;

