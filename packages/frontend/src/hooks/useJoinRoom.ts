import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useRoomStore } from '@/store/roomStore';
import { useSocketStore } from '@/store/socketStore';
import { useSignalingSocketStore } from '@/store/signalingSocketStore';

export default function useJoinRoom() {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const { setRoomData, setAllUsers, setReadyUsers, setHostUserId } = useRoomStore();
  const socket = useSocketStore((state) => state.socket);
  const signalingSocket = useSignalingSocketStore((state) => state.signalingSocket);

  function handleJoinRoom(gsid: string) {
    if (!userId || !socket || !signalingSocket) return;

    socket.emit('join_room', { gsid });
    socket.on('join_room_success', (data) => {
      setRoomData(gsid, data.isHost, false, data.hostUserId);
      setAllUsers(data.userIds);
      setReadyUsers(data.readyUserIds);
      setHostUserId(data.hostUserId);
      signalingSocket.emit('join_room', { gsid });
      navigate(`/game/${gsid}`);
    });

    socket.on('error', (data: { errorMessage: string }) => {
      alert(`방 참가에 실패했습니다: ${data.errorMessage}`);
    });

    signalingSocket.on('error', (error) => {
      console.error('Signaling error:', error);
    });

    return () => {
      socket.off('join_room_success');
      socket.off('error');
      signalingSocket.off('error');
    };
  }

  return { handleJoinRoom };
}
