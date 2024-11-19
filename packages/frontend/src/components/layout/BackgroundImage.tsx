import Background from '@/assets/images/BackgroundImage.svg?url';

interface IBackgroundImageProps {
  gradientClass: string;
}

export default function BackgroundImage({ gradientClass }: IBackgroundImageProps) {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-center bg-cover -z-10"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className={`absolute inset-0 ${gradientClass}`} />
    </div>
  );
}
