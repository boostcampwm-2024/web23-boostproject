import { useEffect, useState } from 'react';
import { useSocketStore } from '@/states/store/socketStore';

interface IVoteResult {
  voteResult: Record<string, number>;
  deadPerson: string;
}

export default function useVoteResult(setRemainingPlayers: (value: number) => void) {
  const socket = useSocketStore((state) => state.socket);
  const [voteResult, setVoteResult] = useState<Record<string, number>>({});
  const [deadPerson, setDeadPerson] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_vote_result', (data: IVoteResult) => {
      setVoteResult(data.voteResult);
      setDeadPerson(data.deadPerson);

      if (data.deadPerson !== 'none' && data.deadPerson) {
        setRemainingPlayers((currentPlayers: number) => currentPlayers - 1);
      }
    });

    return () => {
      socket.off('receive_vote_result');
    };
  }, [socket, setRemainingPlayers]);

  return { voteResult, deadPerson };
}
