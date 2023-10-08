import { Response } from 'express'

class CustomResponse {
  constructor(private response: Response) {}

  send_accepted(message: string, content?: object) {
    this.response.status(202).json({ message, ...content })
  }

  send_badGateway(message: string, content?: object) {
    this.response.status(502).json({ error: message, ...content })
  }

  send_badRequest(message: string, content?: object) {
    this.response.status(400).json({ error: message, ...content })
  }

  send_conflict(message: string, content?: object) {
    this.response.status(409).json({ error: message, ...content })
  }

  send_continue(message: string, content?: object) {
    this.response.status(100).json({ message, ...content })
  }

  send_created(message: string, content?: object) {
    this.response.status(201).json({ message, ...content })
  }

  send_expectationFailed(message: string, content?: object) {
    this.response.status(417).json({ error: message, ...content })
  }

  send_failedDependency(message: string, content?: object) {
    this.response.status(424).json({ error: message, ...content })
  }

  send_forbidden(message: string, content?: object) {
    this.response.status(403).json({ error: message, ...content })
  }

  send_gatewayTimeout(message: string, content?: object) {
    this.response.status(504).json({ error: message, ...content })
  }

  send_gone(message: string, content?: object) {
    this.response.status(410).json({ error: message, ...content })
  }

  send_httpVersionNotSupported(message: string, content?: object) {
    this.response.status(505).json({ error: message, ...content })
  }

  send_imATeapot(message: string, content?: object) {
    this.response.status(418).json({ error: message, ...content })
  }

  send_insufficientSpaceOnResource(message: string, content?: object) {
    this.response.status(419).json({ error: message, ...content })
  }

  send_insufficientStorage(message: string, content?: object) {
    this.response.status(507).json({ error: message, ...content })
  }

  send_internalServerError(message: string, content?: object) {
    this.response.status(500).json({ error: message, ...content })
  }

  send_lengthRequired(message: string, content?: object) {
    this.response.status(411).json({ error: message, ...content })
  }

  send_locked(message: string, content?: object) {
    this.response.status(423).json({ error: message, ...content })
  }

  send_methodFailure(message: string, content?: object) {
    this.response.status(420).json({ error: message, ...content })
  }

  send_methodNotAllowed(message: string, content?: object) {
    this.response.status(405).json({ error: message, ...content })
  }

  send_movedPermanently(message: string, content?: object) {
    this.response.status(301).json({ message, ...content })
  }

  send_movedTemporarily(message: string, content?: object) {
    this.response.status(302).json({ message, ...content })
  }

  send_multiStatus(message: string, content?: object) {
    this.response.status(207).json({ message, ...content })
  }

  send_multipleChoices(message: string, content?: object) {
    this.response.status(300).json({ message, ...content })
  }

  send_networkAuthenticationRequired(message: string, content?: object) {
    this.response.status(511).json({ error: message, ...content })
  }

  send_noContent(message: string, content?: object) {
    this.response.status(204).json({ message, ...content })
  }

  send_nonAuthoritativeInformation(message: string, content?: object) {
    this.response.status(203).json({ message, ...content })
  }

  send_notAcceptable(message: string, content?: object) {
    this.response.status(406).json({ error: message, ...content })
  }

  send_notFound(message: string, content?: object) {
    this.response.status(404).json({ error: message, ...content })
  }

  send_notImplemented(message: string, content?: object) {
    this.response.status(501).json({ error: message, ...content })
  }

  send_notModified(message: string, content?: object) {
    this.response.status(304).json({ message, ...content })
  }

  send_ok(message: string, content?: object) {
    this.response.status(200).json({ message, ...content })
  }

  send_partialContent(message: string, content?: object) {
    this.response.status(206).json({ message, ...content })
  }

  send_paymentRequired(message: string, content?: object) {
    this.response.status(402).json({ error: message, ...content })
  }

  send_permanentRedirect(message: string, content?: object) {
    this.response.status(308).json({ message, ...content })
  }

  send_preconditionFailed(message: string, content?: object) {
    this.response.status(412).json({ error: message, ...content })
  }

  send_preconditionRequired(message: string, content?: object) {
    this.response.status(428).json({ error: message, ...content })
  }

  send_processing(message: string, content?: object) {
    this.response.status(102).json({ message, ...content })
  }

  send_proxyAuthenticationRequired(message: string, content?: object) {
    this.response.status(407).json({ error: message, ...content })
  }

  send_requestHeaderFieldsTooLarge(message: string, content?: object) {
    this.response.status(431).json({ error: message, ...content })
  }

  send_requestTimeout(message: string, content?: object) {
    this.response.status(408).json({ error: message, ...content })
  }

  send_requestTooLong(message: string, content?: object) {
    this.response.status(413).json({ error: message, ...content })
  }

  send_requestUriTooLong(message: string, content?: object) {
    this.response.status(414).json({ error: message, ...content })
  }

  send_requestedRangeNotSatisfiable(message: string, content?: object) {
    this.response.status(416).json({ error: message, ...content })
  }

  send_resetContent(message: string, content?: object) {
    this.response.status(205).json({ message, ...content })
  }

  send_seeOther(message: string, content?: object) {
    this.response.status(303).json({ message, ...content })
  }

  send_serviceUnavailable(message: string, content?: object) {
    this.response.status(503).json({ error: message, ...content })
  }

  send_switchingProtocols(message: string, content?: object) {
    this.response.status(101).json({ message, ...content })
  }

  send_temporaryRedirect(message: string, content?: object) {
    this.response.status(307).json({ message, ...content })
  }

  send_tooManyRequests(message: string, content?: object) {
    this.response.status(429).json({ error: message, ...content })
  }

  send_unauthorized(message: string, content?: object) {
    this.response.status(401).json({ error: message, ...content })
  }

  send_unprocessableEntity(message: string, content?: object) {
    this.response.status(422).json({ error: message, ...content })
  }

  send_unsupportedMediaType(message: string, content?: object) {
    this.response.status(415).json({ error: message, ...content })
  }

  send_useProxy(message: string, content?: object) {
    this.response.status(305).json({ message, ...content })
  }
}

export default CustomResponse
