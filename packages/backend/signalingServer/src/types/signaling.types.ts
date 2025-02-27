import { Socket } from 'socket.io';

// 방 관련 페이로드
export interface IRoomPayload {
  gsid: string;
  targetUserId?: string;
  fromUserId?: string;
}

// Offer 페이로드
export interface IOfferPayload {
  fromUserId: string;
  offer: RTCSessionDescriptionInit;
  gsid: string;
  targetUserId: string;
}

// 응답 페이로드
export interface IOfferResponse {
  fromUserId: string;
  offer: RTCSessionDescriptionInit;
}

export interface IAnswerPayload {
  targetUserId: string;
  fromUserId: string;
  answer: RTCSessionDescriptionInit;
  gsid: string;
}

// ICE Candidate 페이로드
export interface ICandidatePayload {
  targetUserId: string;
  fromUserId: string;
  candidate: RTCIceCandidate;
  gsid: string;
}

export interface IServerEventsType {
  video_offer: (payload: IOfferPayload) => void;
  video_answer: (payload: IAnswerPayload) => void;
  new_ice_candidate: (payload: ICandidatePayload) => void;
  user_joined: (payload: IRoomPayload) => void;
  user_left: (payload: IRoomPayload) => void;
  error: (error: string) => void;
  create_room: (payload: IRoomPayload) => void;
  join_room: (payload: IRoomPayload) => void;
  leave_room: () => void;
}

export interface IClientEventsType {
  video_offer: (payload: IOfferPayload) => void;
  video_answer: (payload: IAnswerPayload) => void;
  new_ice_candidate: (payload: ICandidatePayload) => void;
  user_joined: (payload: IRoomPayload) => void;
  user_left: (payload: IRoomPayload) => void;
  error: (error: string) => void;
  create_room: (payload: IRoomPayload) => void;
  join_room: (payload: IRoomPayload) => void;
  leave_room: () => void;
}

export interface ISignalingSocket extends Socket<IServerEventsType, IClientEventsType> {}

export type IWebRTCPayload = IOfferPayload | IAnswerPayload | ICandidatePayload | IRoomPayload;
