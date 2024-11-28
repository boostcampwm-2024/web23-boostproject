import VideoStream from '@/components/gamePage/stream/VideoStream';
import { useLocalStreamStore } from '@/states/store/localStreamStore';
import CameraSettingButton from '@/components/gamePage/stream/CameraSettingButton';
import MikeSettingButton from '@/components/gamePage/stream/MikeSettingButton';

interface IVideoAudioTestModalProps {
  onClose: () => void;
  title: string;
}

export default function VideoAudioTestModal({ onClose, title }: IVideoAudioTestModalProps) {
  const localStream = useLocalStreamStore((state) => state.localStream);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="min-w-[600px] max-w-lg p-8 bg-white shadow-lg rounded-2xl flex flex-col items-center gap-8">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-900">{title}</h2>
        <VideoStream userName="카메라 테스트" stream={localStream} />
        <div className="flex gap-4">
          <CameraSettingButton iconColor="text-black" />
          <MikeSettingButton iconColor="text-black" />
        </div>
        <button
          onClick={onClose}
          className="w-32 py-2 text-black border border-black rounded-lg hover:bg-gray-100"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
